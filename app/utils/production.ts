// Production environment utilities
export const isProduction = process.env.NODE_ENV === 'production';

// Disable React DevTools in production
if (isProduction && typeof window !== 'undefined') {
  // @ts-ignore
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = {
    isDisabled: true,
    supportsFiber: true,
    inject: () => {},
    onCommitFiberRoot: () => {},
    onCommitFiberUnmount: () => {},
  };
}
