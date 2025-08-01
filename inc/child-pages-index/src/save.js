import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    return (
        <div {...useBlockProps.save()}>
            <p>{'This block is dynamically rendered on the frontend via PHP.'}</p>
        </div>
    );
};

export default Save;
