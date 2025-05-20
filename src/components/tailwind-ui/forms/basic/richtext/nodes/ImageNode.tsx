import { $applyNodeReplacement, DecoratorNode } from 'lexical';
import type {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from 'lexical';
import type { ReactNode } from 'react';

import { ImageComponent } from '../components/ImageComponent';

export type ImagePayloadWithKey = ImagePayload & { imageKey: NodeKey };
export type NewImagePayload = ImagePayload & { imageKey?: NodeKey };

export interface ImagePayload {
  alt: string;
  src: string;
  key?: NodeKey;

  height?: ImageSize;
  width?: ImageSize;
}

export type SerializedImageNode = Spread<
  {
    alt: string;
    src: string;
    type: 'image';
    version: 1;
    height?: number;
    width?: number;
  },
  SerializedLexicalNode
>;

export type ImageSize = 'inherit' | number;

function convertImageElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const { alt, src, width, height } = domNode;
    const node = $createImageNode({ alt, height, src, width });
    return { node };
  }

  return null;
}

export class ImageNode extends DecoratorNode<ReactNode> {
  private src: string;
  private alt: string;

  private width: ImageSize;
  private height: ImageSize;

  public constructor(
    src: string,
    alt: string,
    width?: ImageSize,
    height?: ImageSize,
    imageKey?: NodeKey,
  ) {
    super(imageKey);

    this.src = src;
    this.alt = alt;
    this.width = width || 'inherit';
    this.height = height || 'inherit';
  }

  public static getType(): string {
    return 'image';
  }

  public static clone(node: ImageNode): ImageNode {
    return new ImageNode(
      node.src,
      node.alt,
      node.width,
      node.height,
      node.__key,
    );
  }

  public exportJSON(): SerializedImageNode {
    return {
      alt: this.alt,
      src: this.src,
      height: this.height === 'inherit' ? 0 : this.height,
      width: this.width === 'inherit' ? 0 : this.width,
      type: 'image',
      version: 1,
    };
  }

  public exportDOM(): DOMExportOutput {
    const element = document.createElement('img');

    element.setAttribute('src', this.src);
    element.setAttribute('alt', this.alt);
    element.setAttribute('width', this.width.toString());
    element.setAttribute('height', this.height.toString());

    return { element };
  }

  public static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { alt, src, width, height } = serializedNode;
    return $createImageNode({ alt, src, width, height });
  }

  public createDOM(config: EditorConfig): HTMLElement {
    const div = document.createElement('div');
    const className = config.theme.image;

    if (className) {
      div.className = className;
    }

    return div;
  }

  public setWidthAndHeight(width: ImageSize, height: ImageSize): void {
    const writable = this.getWritable();
    writable.height = height;
    writable.width = width;
  }

  public updateDOM(): boolean {
    return false;
  }

  static importDOM(): DOMConversionMap | null {
    return {
      img: () => ({
        conversion: convertImageElement,
        priority: 0,
      }),
    };
  }

  public decorate(): ReactNode {
    return (
      <ImageComponent
        alt={this.alt}
        src={this.src}
        imageKey={this.__key}
        width={this.width}
        height={this.height}
      />
    );
  }
}

export function $createImageNode(
  props: ImagePayload & { imageKey?: NodeKey },
): ImageNode {
  const { alt, src, imageKey, width, height } = props;

  return $applyNodeReplacement(
    new ImageNode(src, alt, width, height, imageKey),
  );
}

export function $isImageNode(node?: LexicalNode | null): node is ImageNode {
  return node instanceof ImageNode;
}
