import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls,FontSizePicker } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { useEffect, useState } from '@wordpress/element';
import { RawHTML } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { dateI18n, format, getSettings } from '@wordpress/date';

const Edit = ({ attributes, setAttributes }) => {
    const {
		showPages,
		showCategories,
		showTags, 
		showPosts,
        showPostDate, 
        showPostExcerpt,
		showCustomPostTypes,
        selectedCustomPostType ,
		enableAccordion,
		showDate,
		showExcerpt,
        order, 
        orderby,
        orderbypages,
        orderposts,
        orderbycat,
        titleFontSize,
        fontSize,
        listStyle
     } = attributes;

    // Sorting options
    const orderOptions = [
        { label: __('Ascending (A→Z / Oldest)', 'edge-expansion' ), value: 'asc' },
        { label: __('Descending order (Z→A / Newest)', 'edge-expansion' ), value: 'desc' },
    ];
    
    const orderPagesOptions = [
        { label: __('By title', 'edge-expansion'), value: 'post_title' },
        { label: __('By date', 'edge-expansion'), value: 'post_date' },
        { label: __('By Slug', 'edge-expansion'), value: 'post_name' },
        { label: __('Last updated', 'edge-expansion'), value: 'post_modified' },
        { label: __('Random', 'edge-expansion'), value: 'rand' }
    ];

    const orderbyOptions = [
        { label: __('By title', 'edge-expansion' ), value: 'title' },
        { label: __('Posted by date', 'edge-expansion' ), value: 'date' },
        { label: __('Last updated', 'edge-expansion' ), value: 'modified' },
    ];

    const orderbyCategories = [
        { label: __('select', 'edge-expansion' ), value: '' },
        { label: __('Alphabetical order', 'edge-expansion' ), value: 'name' },
    ];


    // Get a static page
    const pages = useSelect((select) => {
        return select('core').getEntityRecords('postType', 'page', { per_page: -1, order, orderbypages });
    }, [order, orderbypages]);

    // Get post data
    const posts = useSelect((select) => 
        select('core').getEntityRecords('postType', 'post', { per_page: -1, order, orderby }), 
        [order, orderby]
    );

    // Get a list of categories
    const categories = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'category', { per_page: -1, order, orderbycat });
    }, [order, orderbycat]);

    // Get a list of tags
    const tags = useSelect((select) => {
        return select('core').getEntityRecords('taxonomy', 'post_tag', { per_page: -1, order, orderbycat });
    }, [order, orderbycat]);

    const blockProps = useBlockProps();

    // Get custom post types
    const customPostTypes = useSelect((select) => {
        const { getPostTypes } = select('core');
        const postTypes = getPostTypes({ per_page: -1 });
        return postTypes?.filter((type) => !['post', 'page', 'attachment', 'revision', 'nav_menu_item', 'wp_block', 'wp_template', 'wp_template_part', 'wp_global_styles', 'wp_navigation', 'wp_font_family', 'wp_font_face'].includes(type.slug)) || [];
    }, []);

    const siteUrl = useSelect((select) => select('core').getSite()?.url, []);
    
    const renderPages = (pages, parent = 0) => {
        const children = pages.filter((page) => page.parent === parent);
        //alert(children);
        if (!children.length) return null;
        //alert(children.length);
        return (
            <ul>
                {children.map((page) => (
                    <li key={page.id}>
                        {page.title.rendered}
                        {renderPages(pages, page.id)} {/* Display child and grandchild pages recursively */}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <>
            {/* Block Settings (Sidebar) */}
            <InspectorControls>
                <PanelBody title={ __( 'Sorting Settings', 'edge-expansion' ) } initialOpen={true}>
                    <SelectControl
                        label={ __( 'Sort by', 'edge-expansion' ) }
                        value={order}
                        options={orderOptions}
                        onChange={(newOrder) => setAttributes({ order: newOrder })}
                    />
                    {order}
                    <SelectControl
                        label={ __( 'Sorting criteria for pages', 'edge-expansion' ) }
                        value={orderbypages}
                        options={orderPagesOptions}
                        onChange={(newOrderpages) => setAttributes({ orderbypages: newOrderpages })}
                    />
                    {orderbypages}
                    <SelectControl
                        label={ __( 'Sorting criteria for posts', 'edge-expansion' ) }
                        value={orderby}
                        options={orderbyOptions}
                        onChange={(newOrderby) => setAttributes({ orderby: newOrderby })}
                    />
                    {orderby}
                    <SelectControl
                        label={ __( 'Category/tag sorting criteria', 'edge-expansion' ) }
                        value={orderbycat}
                        options={orderbyCategories}
                        onChange={(newOrderbycat) => setAttributes({ orderbycat: newOrderbycat })}
                    />
                    {orderbycat}
                </PanelBody>

                <PanelBody title={ __( 'Display settings', 'edge-expansion' ) } initialOpen={true}>
					<ToggleControl
						label={ __( 'Show Pages', 'edge-expansion' ) }
						checked={showPages}
						onChange={(value) => setAttributes({ showPages: value })}
					/>
					<ToggleControl
						label={ __( 'Show Categories', 'edge-expansion' ) }
						checked={showCategories}
						onChange={(value) => setAttributes({ showCategories: value })}
					/>
					<ToggleControl
						label={ __( 'Show Tags', 'edge-expansion' ) }
						checked={showTags}
						onChange={(value) => setAttributes({ showTags: value })}
					/>
                    <ToggleControl
                        label={ __( 'Show Post Pages', 'edge-expansion' ) }
                        checked={showPosts}
                        onChange={(newValue) => setAttributes({ showPosts: newValue })}
                    />
                    <ToggleControl
                       label={ __( 'Show Custom Post Types', 'edge-expansion' ) }
                       checked={showCustomPostTypes}
                       onChange={(newValue) => setAttributes({ showCustomPostTypes: newValue })}
                   />
                    {showPosts && (
                        <>
                            <ToggleControl
                                label={ __( 'Show the Post Date for a Post or Custom Post Type', 'edge-expansion' ) }
                                checked={showPostDate}
                                onChange={(newValue) => setAttributes({ showPostDate: newValue })}
                            />
                            <ToggleControl
                                label={ __( 'Show summary of posts and custom post types', 'edge-expansion' ) }
                                checked={showPostExcerpt}
                                onChange={(newValue) => setAttributes({ showPostExcerpt: newValue })}
                            />
                        </>
                    )}
                </PanelBody>
                <PanelBody title={ __( 'Font settings', 'edge-expansion' ) } initialOpen={true}>
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
                    <div>
                        <strong>{__('Font Size', 'edge-expansion')}</strong>
                        <FontSizePicker
                            value={fontSize}
                            onChange={(size) => setAttributes({ fontSize: size })}
                        />
                    </div>
                    </PanelRow>
                    </PanelBody>

                    <PanelBody title={ __( 'List settings', 'edge-expansion' ) } initialOpen={true}>
                 <PanelRow>
                    <div>
                        <strong>{__('List Style Type', 'edge-expansion')}</strong>
                        <SelectControl
                        label={__('Sort by', 'edge-expansion')}
                        value={listStyle}
                        options={[
                            { label: __('disc', 'edge-expansion'), value: 'disc' },
                            { label: __('circle', 'edge-expansion'), value: 'circle' },
                            { label: __('square', 'edge-expansion'), value: 'square' },
                            { label: __('decimal', 'edge-expansion'), value: 'decimal' },
                            { label: __('Roman numerals', 'edge-expansion'), value: 'upper-roman' },
                            { label: __('Lowercase Alphabet', 'edge-expansion'), value: 'lower-alpha' },
                            { label: __('none', 'edge-expansion'), value: 'none' }
                        ]}
                        onChange={(value) => setAttributes({ listStyle: value })}
                    />
                    </div>
                    </PanelRow>
                    </PanelBody>

            </InspectorControls>

            {/* Preview in block */}
            <div {...useBlockProps()}>
            <div class="wp-block-custom-html-sitemap-block">

            {showPages && (
                <div>
                <h3 style={{ fontSize:titleFontSize }}>{__('Pages', 'edge-expansion' ) }</h3>
                <ul>
                    {pages?pages.map((page) => (
                        <li key={page.id} className={`custom-list ${listStyle}`} style={{ fontSize:fontSize }}><a href={page.link} target="_blank" rel="noopener noreferrer">
                            {page.title.rendered}</a>
                        </li>
                       
                    )) : <p>{__('Loading...', 'edge-expansion' ) }</p>}
                </ul>
                </div>
            )}
            {showCategories && (
                <div>
                <h3 style={{ fontSize:titleFontSize }}>{__('Categories', 'edge-expansion' ) }</h3>

                <ul>
                    {categories?categories.map((category) => (
                        <li key={category.id} className={`custom-list ${listStyle}`} style={{ fontSize:fontSize }}><a href={category.link} target="_blank" rel="noopener noreferrer">
                            {category.name}</a></li>
                    )): <p>{__('Loading...', 'edge-expansion' ) }</p>}
                </ul>
                </div>
            )}
            {showTags && (
                <div>
                <h3 style={{ fontSize:titleFontSize }}>{__('Tags', 'edge-expansion' ) }</h3>
                <ul>
                    {tags?tags.map((tag) => (
                        <li key={tag.id} className={`custom-list ${listStyle}`} style={{ fontSize:fontSize }}><a href={tag.link} target="_blank" rel="noopener noreferrer">
                            {tag.name}</a></li>
                    )): <p>{__('Loading...', 'edge-expansion' ) }</p>}
                </ul>
                </div>
            )}

            {showPosts && (
                <div>
                    <h3 style={{ fontSize:titleFontSize }}>{__('Posts', 'edge-expansion' ) }</h3>
                    <ul>
                        {posts ? posts.map((post) => (
                             <li key={post.id} className={`custom-list ${listStyle}`}><a href={post.link} target="_blank" rel="noopener noreferrer" style={{ fontSize:fontSize }}>
                                {post.title.rendered}</a>
                                    
                                {showPostDate && (
                                    <div className='wp-block-html-sitemap-block-date' style={{ fontSize: '0.9em', color: '#666' }}>
                                        <time dateTime={ format( 'c', post.date_gmt ) }>
                                            { dateI18n(
                                                getSettings().formats.date, 
                                                post.date_gmt
                                            )}
                                        </time>
                                    </div>
                                    ) 
                                }
                                {showPostExcerpt && post.excerpt.rendered && (
                                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                )}
                            </li>
                        )) : <p>{__('Loading...', 'edge-expansion' ) }</p>}
                    </ul>
                </div>
            )}

            {showCustomPostTypes && (
                <div>
                    <h3>{__('Custom Post Types', 'edge-expansion')}</h3>
                    {customPostTypes.length === 0 ? (
                    <p>{__('No custom post types found.', 'edge-expansion')}</p>
                    ) : (
                    <ul>
                    {customPostTypes.map((type) => {
                        const archiveUrl = `${siteUrl}/${type.rest_base}/`; // Constructing the Right URL
                        return (
                            <li key={type.slug} className={`custom-list ${listStyle}`}>
                                <a href={archiveUrl} target="_blank" rel="noopener noreferrer">
                                    {type.name}
                                </a>
                            </li>
                        );
                    })}
                    </ul>
                    )}
                </div>
            )}

                
            </div>
            </div>
        </>
    );
};

export default Edit;