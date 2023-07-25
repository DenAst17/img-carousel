export default class Image
{
    constructor(data: Record<string, unknown>) {
        Object.assign(this, data);
        this.isSelected = false;
    }

    public id: number | undefined;
    public author: string | undefined;
    public width: number | undefined;
    public height: number | undefined;
    public url: string | undefined;
    public download_url: string | undefined;
    public isSelected: boolean;
}