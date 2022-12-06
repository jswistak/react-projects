import React from 'react';

interface LoaderInnerProps {
    loading: boolean;
    label?: string;
}

export declare type LoaderProps = React.PropsWithChildren<LoaderInnerProps>;

const Loader: React.FC<LoaderProps> = (props: LoaderProps) => {
    if (props.loading) {
        //console.log(props.label)
        return (
            <>
            {props.label ? props.label + '...' : 'Loading...'}
            </>
        )
    }
    return (
        <>{props.children}</>
    )
}

export default Loader;
