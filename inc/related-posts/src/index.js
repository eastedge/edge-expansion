import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './editor.scss';
import Edit from './edit';
import save from './save';

registerBlockType('edge/related-posts', {
    title: __('Related Posts', 'edge-expansion'),
	description: __('Display a list of related posts in a list or column', 'edge-expansion'),
    category: 'edge',
    icon: 'format-aside',
    supports: {
        html: false,
    },
    attributes: {
        postsToShow: {
            type: 'number',
            default: 6,
        },
        numberColumns: {
            type: 'number',
            default: 3,
        },
        fontSize: {
            type: 'string',
            default: '21px',
        },
        showImage: {
            type: 'boolean',
            default: true,
        },
        showCategory: {
            type: 'boolean',
            default: true,
        },
        showDate: {
            type: 'boolean',
            default: true,
        },
        showAuthor: {
            type: 'boolean',
            default: true,
        },
        showExcerpt: {
            type: 'boolean',
            default: true,
        },
        excerptLength: {
            type: 'number',
            default: 20,
        },
    },
	textdomain: 'edge-expansion',
    edit: Edit,
    save,
});
