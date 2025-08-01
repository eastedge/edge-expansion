import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls,FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, RangeControl} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';
import { dateI18n, format, getSettings } from '@wordpress/date';

const Edit = ({ attributes, setAttributes }) => {
    const { postsToShow, numberColumns,fontSize, showImage, showCategory, showDate, showAuthor, showExcerpt, excerptLength } = attributes;
    
    const { categories, postId } = useSelect((select) => {
        const post = select('core/editor').getCurrentPost();
        return {
            categories: post ? post.categories : [],
            postId: post ? post.id : null,
        };
    }, []);

    const posts = useSelect((select) => {
        if (!categories.length) return [];
        return select('core').getEntityRecords('postType', 'post', {
            per_page: postsToShow,
            categories: categories,
            exclude: postId,
            _embed: true,
        });
    }, [categories, postsToShow, postId]);

    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title={__('Settings', 'edge-expansion')}>
                <PanelRow>
                    <RangeControl
                        label={__('Number of Posts', 'edge-expansion')}
                        value={postsToShow}
                        onChange={(value) => setAttributes({ postsToShow: value })}
                        min={1}
                        max={10}
                    />
                </PanelRow>
                <PanelRow>   
                    <RangeControl
                        label={ __( 'Number of Columns', 'edge-expansion' ) }
                        value={numberColumns}
                        onChange={(val) => setAttributes({ numberColumns: val  })}
                        min={1}
                        max={4}
                        step={1}
                    />
                    </PanelRow>
                    <PanelRow>  
                        <strong>{__('Title Font Size', 'edge-expansion')}</strong>
                        <FontSizePicker
                            value={fontSize}
                            onChange={(size) => setAttributes({ fontSize: size })}
                        />
                    </PanelRow>
                    <p></p>
                    <ToggleControl
                        label={__('Display Image', 'edge-expansion')}
                        checked={showImage}
                        onChange={(value) => setAttributes({ showImage: value })}
                    />  
                    <ToggleControl
                        label={__('Display Category', 'edge-expansion')}
                        checked={showCategory}
                        onChange={(value) => setAttributes({ showCategory: value })}
                    />  
                    <ToggleControl
                        label={__('Display Date', 'edge-expansion')}
                        checked={showDate}
                        onChange={(value) => setAttributes({ showDate: value })}
                    />
                    <ToggleControl
                        label={__('Display Author', 'edge-expansion')}
                        checked={showAuthor}
                        onChange={(value) => setAttributes({ showAuthor: value })}
                    />
                    <ToggleControl
                        label={__('Display Excerpt', 'edge-expansion')}
                        checked={showExcerpt}
                        onChange={(value) => setAttributes({ showExcerpt: value })}
                    />
                    {showExcerpt && (
                        <RangeControl
                            label={__('Excerpt Length', 'edge-expansion')}
                            value={excerptLength}
                            onChange={(value) => setAttributes({ excerptLength: value })}
                            min={10}
                            max={100}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <ul className={`wp-block-related-posts-items container-${numberColumns }`} >
                {posts && posts.map((post) => (
                    <li key={post.id} className="related-item">
                        {
                            showImage && 
                            post._embedded && 
                            post._embedded['wp:featuredmedia'] &&
                            post._embedded['wp:featuredmedia'][0] &&
                            <img 
                                className='wp-block-related-posts-thumbnail'
                                src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url }
                                alt={ post._embedded['wp:featuredmedia'][0].alt_text }
                            />
                        }
                        <div className="wp-block-related-posts-content">
                        <h4 className="wp-block-related-posts-title" style={{ fontSize:fontSize }}>
                        <a href={post.link}>{post.title.rendered}</a>
                        </h4>
                        <div className="wp-block-related-posts-meta">
                        {showDate && (
                        <span className="wp-block-related-posts-date">
                        <time dateTime={ format( 'c', post.date_gmt ) }>
							{ dateI18n(
								getSettings().formats.date, 
                                post.date_gmt
							)}
						</time>
                        </span>
							) 
						}
                        {showCategory && post._embedded && post._embedded['wp:term'] && (
                            <span className="wp-block-related-posts-category">
                                {post._embedded['wp:term'][0].map((cat) => cat.name).join(', ')}
                            </span>
                        )}
                        {showAuthor && 
							<span className="wp-block-related-posts-author">
								{post._embedded.author[0].name}
							</span>
						}
                        </div>
                        
                        {showExcerpt &&
							// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
							post.excerpt?.rendered && (
								<div className="wp-block-related-posts-excerpt">
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
    );
};

export default Edit;
