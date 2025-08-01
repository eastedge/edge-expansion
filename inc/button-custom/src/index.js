import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './style.scss';
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata.name, {
    title: __('Custom Buttons', 'edge-expansion'),
    description: __('A block that allows you to change the text or background color on hover of a button.', 'edge-expansion'),
    category: 'edge',
    icon: 'button',
    attributes: metadata.attributes,
    edit: Edit,
    save,
});
