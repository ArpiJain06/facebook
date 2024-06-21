export class CreatePostDto {
    readonly userId: string;
    readonly title: string;
    readonly content: string;
  }

export class UpdatePostDto {
    readonly title?: string;
    readonly content?: string;
    readonly userId?: string;
}
  