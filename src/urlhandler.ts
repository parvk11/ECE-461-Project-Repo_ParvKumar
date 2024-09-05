//import { GitAPIHandler } from './gitAPIHandler';
import { npmHandler } from './npmHandler';

export class URLHandler {
    private url: string;
    private GITHUB_URL_PATTERN: RegExp;
    private NPM_URL_PATTERN: RegExp;

    constructor(url: string) {
        this.url = url;
        this.GITHUB_URL_PATTERN = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
        this.NPM_URL_PATTERN = /^https:\/\/www\.npmjs\.com\/package\/([^\/]+)/;

        if (!this.isValidUrl()) {
            throw new Error('Invalid URL');
        }
    }

    private isValidUrl(): boolean {
        return this.GITHUB_URL_PATTERN.test(this.url) || this.NPM_URL_PATTERN.test(this.url);
    }

    public async handle() {
        if (this.GITHUB_URL_PATTERN.test(this.url)) {
            // Delegate to GitAPIHandler
            const match = this.GITHUB_URL_PATTERN.exec(this.url);
            const owner = match ? match[1] : null;
            const repo = match ? match[2] : null;

            if (owner && repo) {
                //const gitHandler = new GitAPIHandler(owner, repo);
                //await gitHandler.processRepo();
            } else {
                console.error('Invalid GitHub URL format.');
            }
        } else if (this.NPM_URL_PATTERN.test(this.url)) {
            // Delegate to npmHandler
            const match = this.NPM_URL_PATTERN.exec(this.url);
            const packageName = match ? match[1] : null;

            if (packageName) {
                await npmHandler.processPackage(packageName);
            } else {
                console.error('Invalid NPM URL format.');
            }
        } else {
            console.error('Unsupported URL type.');
        }
    }
}
