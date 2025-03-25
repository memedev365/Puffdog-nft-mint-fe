/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        domains: [
            "peach-binding-gamefowl-763.mypinata.cloud",
            "salmon-causal-guan-225.mypinata.cloud"
        ],
    },
    reactStrictMode: false
};

export default nextConfig;
