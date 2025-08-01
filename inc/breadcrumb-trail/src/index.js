/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { __ } from '@wordpress/i18n';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'edge/breadcrumb-trail', {
	title: __('Breadcrumb Trail','edge-expansion'),
	description: __('A list of links in hierarchical order on a Web page','edge-expansion'),
	category: 'edge',
	icon: 'align-pull-left',
	supports: {
	  html: false,
	  spacing: {
		  margin: true,
		  padding: true,
		  blockGap: true
	  }
	},
	//属性を設定
	attributes: {
    homeText: {
      type: 'string',
      default: ''
    },
    displayHomeIcon: {
      type: 'boolean',
      default: true
    },
    homeIconMarginR: {
      type: 'number',
      default: 0
    },
    homeIconMarginT: {
      type: 'number',
      default: 0
    },
    homeIconMarginH: {
      type: 'number',
      default: 0
    },
		fontSize: {
		  type: 'string',
		  default: '16px'
		},
		icon: {
		  type: 'string',
		  default: 'dashicons-arrow-right-alt2'
		},
    iconSize: {
      type: 'number',
      default: 16
    },
		homeIcon: {
		  type: 'string',
		  default: 'home'
		},
    marginRight: {
      type: 'number',
      default: 0
    },
    marginLeft: {
      type: 'number',
      default: 0
    },
		marginTop: {
      type: 'number',
      default: 0
    },
		marginBottom: {
      type: 'number',
      default: 0
    },
    arrowWidth: {
      type: 'number',
      default: 16
    }
  },
  edit: Edit,
  save: () => { return null }
} );