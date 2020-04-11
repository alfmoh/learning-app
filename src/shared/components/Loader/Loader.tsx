import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

const LaLoader = () => {
    return (
        <Segment>
            <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
            </Dimmer>

            <Image src={process.env.PUBLIC_URL + "/loader_image.png"} />
        </Segment>
    );
};

export default LaLoader;
