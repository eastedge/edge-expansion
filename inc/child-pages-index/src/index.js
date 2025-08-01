import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';
import './editor.scss';
import './style.scss';

registerBlockType('edge/child-pages-index', {
    apiVersion: 3,
    title: __('Child Pages index', 'edge-expansion'),
    description: __('Displays a list of child pages on a page.', 'edge-expansion'),
    category: 'edge',
    icon: 'list-view',
    supports: {
        html: false,
    },
    attributes: {
        displayStyle: {
            type: 'string',
            default: 'list'
        },
        showParent: {
            type: 'boolean',
            default: true
        },
        parentFontSize: {
            type: 'string',
            default: '21px'
        },
        numberColumns: {
          type: 'number',
          default: 1
        },
		fontSize: {
            type: 'string',
            default: '21px'
    	},
        showThumbnail: {
            type: 'boolean',
            default: true
        },
        showDate: {
            type: 'boolean',
            default: false
        },
        showAuthor: {
            type: 'boolean',
            default: false
        },
        showExcerpt: {
            type: 'boolean',
            default: false
        },
        excerptLength: {
            type: 'number',
            default: 20
        },
        parentPageId: {
            type: 'number',
            default: 0
        },
        childPageIds: {
            type: 'array',
            default: []
        }
    },
    edit: Edit,
    save: () => null
});
