import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import './editor.scss';
import './style.scss';

const save = () => {
    return null; // The block is dynamic and rendered on the server side
};

registerBlockType('edge/html-sitemap-block', {
    title: __('HTML Sitemap', 'edge-expansion'),
    description: __('Displays an HTML sitemap categorized by pages, posts, categories, tags, and custom post types.', 'edge-expansion'),
    category: 'edge',
    icon: 'admin-site',
    supports: {
        html: false,
    },
    attributes: {
        showPages: { type: 'boolean', default: true },
        showPosts: { type: 'boolean', default: true },
        showCategories: { type: 'boolean', default: true },
        showTags: { type: 'boolean', default: true },
        showCustomPostTypes: { type: 'boolean', default: true },
        showPostDate: { type: 'boolean', default: false },
        showPostExcerpt: { type: 'boolean', default: false },
        accordion: { type: 'boolean', default: true },
		titleFontSize: {type:'string',defaultx: '2.25rem'},
		fontSize: {type: 'string',default: '1.2rem'},
		order: { type: 'string',default: 'asc'},
		orderby: {type: 'string',default: 'title'},
        orderbypages: {type: 'string',default: 'title'},
        orderbycat: {type: 'string',default: 'name'},
        listStyle: {type: 'string',default: 'disc'}
    },
	textdomain: 'edge-expansion',
    edit: Edit,
    save,
});