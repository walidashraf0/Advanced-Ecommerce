import * as React from 'react';

import { PageError } from '@/widgets/PageError';

interface ErrorBoundaryProps {
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.log(error, info)
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <PageError />
        }

        return this.props.children;
    }
}