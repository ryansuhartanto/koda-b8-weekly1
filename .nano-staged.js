const config = {
	"*": ["bun run fmt --check --no-error-on-unmatched-pattern"],
	"*.js": ["bun run lint --no-error-on-unmatched-pattern"],
};

export default config;
