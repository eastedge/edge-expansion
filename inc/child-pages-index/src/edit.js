import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, SelectControl, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { dateI18n, format, getSettings } from '@wordpress/date';

const Edit = ({ attributes, setAttributes }) => {
    const { showParent, parentFontSize, numberColumns,fontSize, showThumbnail, showDate, showAuthor, showExcerpt, excerptLength, parentPageId, childPageIds } = attributes;
    
    const postId = wp.data.select('core/editor').getCurrentPostId();
    const pages = useSelect((select) => select('core').getEntityRecords('postType', 'page', { per_page: -1, _embed: true }), []);
    
    useEffect(() => {
        if (!pages) return;
        const currentPage = pages.find(page => page.id === postId);
        const actualParentPageId = currentPage?.parent || postId;
        const parentPage = pages.find(page => page.id === actualParentPageId);
        const childPages = pages.filter(page => page.parent === actualParentPageId).map(page => page.id);

        if (parentPage?.id !== parentPageId) {
            setAttributes({ parentPageId: parentPage?.id || 0 });
        }
        if (JSON.stringify(childPages) !== JSON.stringify(childPageIds)) {
            setAttributes({ childPageIds: childPages });
        }
    }, [pages, postId, setAttributes]);
    
    const parentPageData = pages?.find(page => page.id === parentPageId);
    const childPageData = childPageIds.map(id => pages?.find(page => page.id === id)).filter(Boolean);
    
    return (
        <div {...useBlockProps()}>
            <InspectorControls>
                <PanelBody title={__('Parent Setting Settings', 'edge-expansion')}>
                <ToggleControl
                        label={__('Show Parent Page', 'edge-expansion')}
                        checked={showParent}
                        onChange={(value) => setAttributes({ showParent: value })}
                    />
			        <PanelRow>
                    <div>
                        <strong>{__('Title Font Size', 'edge-expansion')}</strong>
                        <FontSizePicker
                            value={parentFontSize}
                            onChange={(size) => setAttributes({ parentFontSize: size })}
                        />
                    </div>
                    </PanelRow>
                </PanelBody>
                <PanelBody title={__('Child Pages Settings', 'edge-expansion')}>
                
                    <PanelRow>
                    <RangeControl
							label={ __( 'Number of Columns', 'edge-expansion' ) }
							value={ numberColumns }
							onChange={ ( value ) => setAttributes( { numberColumns: value } )}
							min={ 1 }
							max={ 4 }
					/>
                    </PanelRow>
                    <p></p>
			        <PanelRow>
                    <div>
                        <strong>{__('Title Font Size', 'edge-expansion')}</strong>
                        <FontSizePicker
                            value={fontSize}
                            onChange={(size) => setAttributes({ fontSize: size })}
                        />
                    </div>
                    </PanelRow>
                    <p></p>
                    <ToggleControl
                        label={__('Show Thumbnail', 'edge-expansion')}
                        checked={showThumbnail}
                        onChange={(value) => setAttributes({ showThumbnail: value })}
                    />
                    <ToggleControl
                        label={__('Show Date', 'edge-expansion')}
                        checked={showDate}
                        onChange={(value) => setAttributes({ showDate: value })}
                    />
                    <ToggleControl
                        label={__('Show Author', 'edge-expansion')}
                        checked={showAuthor}
                        onChange={(value) => setAttributes({ showAuthor: value })}
                    />
                    <ToggleControl
                        label={__('Show Excerpt', 'edge-expansion')}
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
            <div className="child-pages-block">
                {showParent && parentPageData && (
                    <div className="parent-page">
                        {showThumbnail && parentPageData._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                            <img src={parentPageData._embedded['wp:featuredmedia'][0].source_url} alt={parentPageData.title.rendered} style={{ width: '100%', height: 'auto' }} />
                        )}
                        {<h3 style={{ fontSize:parentFontSize }}><a href={parentPageData.link}>{parentPageData.title.rendered}</a></h3>}
                        {showDate && (
                        <div className="wp-block-child-pages-block-date">
                        <time dateTime={ format( 'c', parentPageData.date_gmt ) }>
                        { dateI18n(
                            getSettings().formats.date, 
                            parentPageData.date_gmt
                        )}
                        </time>
                        </div>
                        )}
                        {showAuthor &&
                        <div className="wp-block-child-pages-block-author">
                             {parentPageData._embedded.author[0].name}
                        </div>
                        }
                         {showExcerpt && <p>{parentPageData.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, excerptLength)}...</p>}
                          
                    </div>
                    
                )}
                {childPageData.length > 0 ? (
                    <ul className={`wp-block-child-pages-block-items columns-${numberColumns }`} >
                        {childPageData.map(page => (
                            <li key={page.id} className="child-pages-item">
                                <div className="wp-block-child-pages-block-thumbnail">
                                {showThumbnail && page._embedded?.['wp:featuredmedia']?.[0]?.source_url && (
                                    <img src={page._embedded['wp:featuredmedia'][0].source_url} alt={page.title.rendered} style={{ width: '100%', height: 'auto' }} />
                                )}
                                </div>
                                <div className="wp-block-child-pages-block-content">
                                <h4 style={{ fontSize:fontSize }}><a href={page.link}>{page.title.rendered}</a></h4>
                                <div className="wp-block-child-pages-block-meta">
                                {showDate && (
                                <div className="wp-block-child-pages-block-date">
                                <time dateTime={ format( 'c', page.date_gmt ) }>
							    { dateI18n(
								    getSettings().formats.date, 
                                    page.date_gmt
							    )}
						        </time>
                                </div>
							    ) 
						        }
                                {showAuthor &&
                                <div className="wp-block-child-pages-block-author">
                                     {page._embedded.author[0].name}
                                </div>
                                }
                                </div>
                                {showExcerpt && <p>{page.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, excerptLength)}...</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{__('No child pages found.', 'edge-expansion')}</p>
                )}
            </div>
        </div>
    );
};

export default Edit;
