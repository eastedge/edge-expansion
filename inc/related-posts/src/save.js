import { useBlockProps } from '@wordpress/block-editor';

const Save = () => {
    return <div {...useBlockProps.save()}></div>;
};

export default Save;