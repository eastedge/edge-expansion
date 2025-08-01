import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls,FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, RangeControl, ToggleControl,} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, getSettings } from '@wordpress/date';
import apiFetch from '@wordpress/api-fetch';

const Edit = ({ attributes, setAttributes }) => {
    const {
        postType,
        postCount,
        columnsNum,
		fontSize,
        showImage,
        showTaxonomy,
        showDate,
        showAuthor,
        showExcerpt,
        excerptLength
    } = attributes;

    const { postTypes, posts } = useSelect((select) => {
        const allPostTypes = select('core').getPostTypes({ per_page: -1 });
        // Exclude post types
        const excludedPostTypes = ['post', 'page', 'attachment', 'wp_font_face', 'nav_menu_item', 'wp_block', 'wp_template', 'wp_template_part', 'wp_global_styles', 'wp_navigation', 'wp_font_family'];
    
        // Filter for custom post types only
        const postTypes = allPostTypes
            ? allPostTypes.filter(
                  (type) => !excludedPostTypes.includes(type.slug)
              )
            : [];
    
        const posts = postType
            ? select('core').getEntityRecords('postType', postType, {
                  per_page: postCount, // Display number
                  _embed: true,
              })
            : [];
    
        return { postTypes, posts };
        }, [postType, postCount]);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Settings', 'edge-expansion')}>
                <PanelRow>
                    <SelectControl
                        label={__('Post Type', 'edge-expansion')}
                        value={postType}
                        options={[
                            { label:__('Select Options', 'edge-expansion'), value: '' }, // Default "Select" option
                            ...(postTypes?.map((type) => ({
                                label: type.name,
                                value: type.slug,
                            })) || []),
                        ]}
                        //onChange={(newValue) => setSelectedPostType(newValue)}
                        onChange={(value) => setAttributes({ postType: value })}
                    />
                    </PanelRow>
					<PanelRow>
                    <RangeControl
                        label={__('Number of Posts', 'edge-expansion')}
                        value={postCount}
                        onChange={(value) => setAttributes({ postCount: value })}
                        min={1}
                        max={20}
                    />
                    </PanelRow>
					<PanelRow>
						<RangeControl
							label={ __( 'Number of Columns', 'edge-expansion' ) }
							value={ columnsNum }
							onChange={ ( value ) =>
								setAttributes( { columnsNum: value ? value : 3  } )
							}
							min={ 1 }
							max={ 4 }
							initialPosition={ 3 } 
							required
						/>
                        </PanelRow>
                	<PanelRow>
                    <div>
                        <strong>{__('Title Font Size', 'edge-expansion')}</strong>
                        <FontSizePicker
                            value={fontSize}
                            onChange={(size) => setAttributes({ fontSize: size })}
                        />
                    </div>
                	</PanelRow>
                        <PanelRow>
                    <ToggleControl
                        label={__('Show Image', 'edge-expansion')}
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                    />
                    </PanelRow>
					<PanelRow>
                    <ToggleControl
                        label={__('Show Taxonomy', 'edge-expansion')}
                        checked={showTaxonomy}
                        onChange={(value) => setAttributes({ showTaxonomy: value })}
                    />
                    </PanelRow>
					<PanelRow>
                    <ToggleControl
                        label={__('Show Date', 'edge-expansion')}
                        checked={showDate}
                        onChange={(value) => setAttributes({ showDate: value })}
                    />
                    </PanelRow>
					<PanelRow>
                    <ToggleControl
                        label={__('Show Author', 'edge-expansion')}
                        checked={showAuthor}
                        onChange={(value) => setAttributes({ showAuthor: value })}
                    />
                    </PanelRow>
					<PanelRow>
                    <ToggleControl
                        label={__('Show Excerpt', 'edge-expansion')}
                        checked={showExcerpt}
                        onChange={(value) => setAttributes({ showExcerpt: value })}
                    />
                    </PanelRow>
					<PanelRow>
                        <RangeControl
                            label={__('Excerpt Length', 'edge-expansion')}
                            value={excerptLength}
                            onChange={(value) => setAttributes({ excerptLength: value })}
                            min={4}
                            max={160}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
            <div {...useBlockProps()}>
            <ul className={ `wp-block-custom-post-type-items columns-${ columnsNum }` }>
                {posts?.map((post) => (
                    <li key={post.id} className="custompost-item">
                        <div className="wp-block-custom-post-type-thumbnail">
                        {showImage && 
							post._embedded && 
							post._embedded['wp:featuredmedia'] &&
							post._embedded['wp:featuredmedia'][0] &&
							<img 
								className='wp-block-custom-post-type-post-thumbnail'
								src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }
								alt={ post._embedded['wp:featuredmedia'][0].alt_text }
							/>
						}
                        </div>
                        <div className="wp-block-custom-post-type-content">
                        <h5 className='wp-block-custom-post-type-post-title'>
							<a href={ post.link } style={{fontSize }}>
								{ post.title.rendered ? (
								<RawHTML>
									{ post.title.rendered }
								</RawHTML>
								) : (__( 'Default title', 'edge-expansion' )
								)}
							</a>
						</h5>
                       
                        <div className="wp-block-custom-posts-block-meta">
                        {showDate && (
                        <div className='wp-block-custom-post-type-date'>
                        <time dateTime={ format( 'c', post.date_gmt ) }>
							{ dateI18n(
								getSettings().formats.date, 
									post.date_gmt
							)}
						</time>
                        </div>
							) 
						}
                        {showTaxonomy && 
                        <div className='wp-block-custom-post-type-category'>
                        {post._embedded['wp:term']?.map((taxonomy) =>
                            taxonomy.map((term) => (
                                <span key={term.id}>{term.name}&nbsp;</span>
                            )))
                        }
                        </div>
                        }
                        {showAuthor && 
							<div className='wp-block-custom-post-type-author'>
								{post._embedded?.author?.[0]?.name || ''}
							</div>
						}
                        </div>

						{showExcerpt &&
							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
							post.excerpt?.rendered && (
								<div className='wp-block-custom-post-type-excerpt'>
								<RawHTML>
									{ post.excerpt.rendered.substring(0, excerptLength) }
								</RawHTML>
								</div>
							)
						}
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        </>
    );
};

export default Edit;
