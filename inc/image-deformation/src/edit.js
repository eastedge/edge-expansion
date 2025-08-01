import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl, RangeControl, TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { imageUrl, imageAlt, shape, borderRadius, width, height, alignment } = attributes;

    const onSelectImage = (media) => {
        setAttributes({ imageUrl: media.url, imageAlt: media.alt || '' });
    };

    return (
        <div {...useBlockProps()}>
            <BlockControls>
                <AlignmentToolbar
                    value={alignment}
                    onChange={(newAlignment) => setAttributes({ alignment: newAlignment || 'center' })}
                />
            </BlockControls>
            
        <InspectorControls>
            <PanelBody title={__('Settings', 'edge-expansion')} initialOpen={true}>
                <SelectControl
                    label={__('Shape', 'edge-expansion')}
                    value={shape}
                    options={[
                        { label: __('Rectangle or Square', 'edge-expansion'), value: 'rectangle' },
                        { label: __('Rounded', 'edge-expansion'), value: 'rounded' },
                        { label: __('Circle', 'edge-expansion'), value: 'circle' },
                    ]}
                    onChange={(value) => setAttributes({ shape: value })}
                />
                {shape === 'rounded' && (
                    <RangeControl
                        label={__('Border Radius (%)', 'edge-expansion')}
                        value={borderRadius}
                        onChange={(value) => setAttributes({ borderRadius: value })}
                        min={0}
                        max={50}
                    />
                )}
                <TextControl
                    label={__('Width', 'edge-expansion')}
                    value={width}
                    onChange={(value) => setAttributes({ width: value })}
                />
                <TextControl
                    label={__('Height', 'edge-expansion')}
                    value={height}
                    onChange={(value) => setAttributes({ height: value })}
                />
            </PanelBody>
        </InspectorControls>
            <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={['image']}
                render={({ open }) => (
                    <Button onClick={open} variant="primary">
                        {imageUrl ? __('Change Image', 'edge-expansion') : __('Select Image', 'edge-expansion')}
                    </Button>
                )}
            />
            <div className={`edge-image-deformation align-${alignment}`} style={{
                width: width,
                height: height,
            }}
            >
            {imageUrl && shape === 'rectangle' &&(
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={{
                        borderRadius: '0',
                        width: width,
                        height: height,
                        objectFit: 'cover',
                        shapeOutside: shape === 'circle' ? 'circle()' : 'unset',
                    }}
                />
            )}
            {imageUrl && shape === 'rounded' &&(
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={{
                        borderRadius: shape === 'rounded' || shape === 'circle' ? `${borderRadius}%` : '0',
                        width: width,
                        height: height,
                        objectFit: 'cover',
                        shapeOutside: shape === 'circle' ? 'circle()' : 'unset',
                    }}
                />
            )}

            {imageUrl && shape === 'circle' &&(
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    style={{
                        borderRadius: '50%',
                        width: width,
                        height: height,
                        objectFit: 'cover',
                        shapeOutside: shape === 'circle' ? 'circle()' : 'unset',
                    }}
                />
            )}
        </div>
        </div>
    );
};

export default Edit;
