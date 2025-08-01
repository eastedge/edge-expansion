import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, RangeControl, Spinner } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';
import { Fragment } from '@wordpress/element';
import { dateI18n, format, getSettings } from '@wordpress/date';
import { decodeEntities } from '@wordpress/html-entities';

const stripHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

const Edit = ({ attributes, setAttributes }) => {
  const { 
    numberOfPosts,
    numberOfColumns,
    titleFontSize,
    displayThumbnail,
    displayCategory,
    displayDate,
    displayAuthor,
    displayExcerpt,
    lateExcLength
  } = attributes;

  const posts = useSelect((select) => {
    return select('core').getEntityRecords('postType', 'post', {
      per_page: numberOfPosts,
      _embed: true,
    });
  }, [numberOfPosts]);

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={ __( 'Settings', 'edge-expansion' ) }>
          <PanelRow>
            <RangeControl
							label={ __( 'Number of posts to show', 'edge-expansion' ) }
							value={ numberOfPosts }
							onChange={ ( value ) => setAttributes( { numberOfPosts: value } )}
							min={ 1 }
							max={ 36 }
					/>
          </PanelRow>
          <PanelRow>
            <RangeControl
							label={ __( 'Number of Columns', 'edge-expansion' ) }
							value={ numberOfColumns }
							onChange={ ( value ) => setAttributes( { numberOfColumns: value } )}
							min={ 1 }
							max={ 4 }
					/>
          </PanelRow>
			    <PanelRow>
            <div>
              <strong>{__('Title Font Size', 'edge-expansion')}</strong>
              <FontSizePicker
                value={titleFontSize}
                  onChange={(size) => setAttributes({ titleFontSize: size })}
              />
            </div>
              </PanelRow>
              <PanelRow>
                    <ToggleControl
                        label={ __( 'Display Image', 'edge-expansion' ) }
                        checked={displayThumbnail}
                        onChange={(value) => setAttributes({ displayThumbnail: value })}
                    />
              </PanelRow>
              <PanelRow>
                    <ToggleControl
                        label={ __( 'Display Category', 'edge-expansion' ) }
                        checked={displayCategory}
                        onChange={(value) => setAttributes({ displayCategory: value })}
                    />
              </PanelRow>
              <PanelRow>
                    <ToggleControl
                        label={ __( 'Display Date', 'edge-expansion' ) }
                        checked={displayDate}
                        onChange={(value) => setAttributes({ displayDate: value })}
                    />
              </PanelRow>
              <PanelRow>
                    <ToggleControl
                        label={ __( 'Display Author', 'edge-expansion' ) }
                        checked={displayAuthor}
                        onChange={(value) => setAttributes({ displayAuthor: value })}
                    />
              </PanelRow>
              <PanelRow>
                    <ToggleControl
                        label={ __( 'Display Excerpt', 'edge-expansion' ) }
                        checked={displayExcerpt}
                        onChange={(value) => setAttributes({ displayExcerpt: value })}
                    />
              </PanelRow>
					    <PanelRow>
                <RangeControl
                            label={__('Excerpt Length', 'edge-expansion')}
                            value={lateExcLength}
                            onChange={(value) => setAttributes({ lateExcLength: value })}
                            min={4}
                            max={160}
                        />
                </PanelRow>
              </PanelBody>
            </InspectorControls>
            <div className="latest-posts-block">
				<ul className={ `wp-block-latest-posts-block-items columns-${numberOfColumns }` }>
        {!posts && <Spinner />}
        {posts && posts.length === 0 && <p>{__('No posts found.', 'edge-expansion')}</p>}
        {posts && posts.length > 0 && (
          posts.map((post) => {
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

            // Category Acquisition (Safely)
            const categories = Array.isArray(post._embedded?.['wp:term'])
              ? post._embedded['wp:term'].find(
                  (termGroup) =>
                    Array.isArray(termGroup) &&
                    termGroup[0]?.taxonomy === 'category'
                ) || []
              : [];

            const categoryNames = categories.map((cat) => cat.name).join(', ');
            const author = post._embedded?.['author']?.[0]?.name || '';
            const date = new Date(post.date).toLocaleDateString();

            // Convert excerpt or text to text
            const rawExcerpt = post.excerpt?.rendered || post.content?.rendered || '';
            const cleanExcerpt = decodeEntities(stripHTML(rawExcerpt)).slice(0, `${lateExcLength }`);

            return (
              <li key={post.id} className="post-item">

                <div className="wp-block-latest-posts-block-thumbnail">
                {displayThumbnail && featuredImage && (
                  <img src={featuredImage} alt={post.title.rendered} />
                )}
                </div>
                  <div className="wp-block-latest-posts-block-content">
                  
                  <h4 className='wp-block-latest-posts-block-title' style={{ fontSize:titleFontSize }}>
							  <a href={ post.link }>
								{ post.title.rendered ? (
								<RawHTML>
									{ post.title.rendered }
								</RawHTML>
							  ) : (
									__( 'Default title', 'edge-expansion' )
										)}
							  </a>
						    </h4>
                <div className="wp-block-latest-posts-block-meta">
                {displayDate && (
                  <div className='wp-block-latest-posts-block-date'>
                  <time dateTime={ format( 'c', post.date_gmt ) }>
							    { dateI18n(
								  getSettings().formats.date, 
									post.date_gmt
							    )}
						      </time>
                  </div>
							  ) 
						    }
                {displayCategory && categoryNames &&
							    <div className='wp-block-latest-posts-block-category'>
								   {categoryNames}
							    </div>
						    }
						    {displayAuthor && 
							    <div className='wp-block-latest-posts-block-author'>
								  {post._embedded.author[0].name}
							    </div>
						    }
                </div>
                {displayExcerpt &&
                <div className='wp-block-latest-posts-block-excerpt'>
									<RawHTML>
                {cleanExcerpt}
                </RawHTML>
                </div>
						    }
              </div>
              </li>
            );
          })
        )}
				</ul>
        </div>
        </div>
  );
};

export default Edit;
