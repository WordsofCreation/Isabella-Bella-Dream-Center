const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPagesSite = repositoryName.endsWith(".github.io");
const githubPagesBasePath = isGithubActions && repositoryName && !isUserOrOrgPagesSite ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(githubPagesBasePath
    ? {
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
      }
    : {}),
};

export default nextConfig;
