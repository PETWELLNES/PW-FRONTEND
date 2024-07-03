import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-pet-desc',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './pet-desc.component.html',
  styleUrl: './pet-desc.component.css'
})
export class PetDescComponent implements AfterViewInit{
  editorActive = false;
  editor: any;
  post = { content: '' };

  toggleEditor() {
    this.editorActive = !this.editorActive;
    if (this.editorActive) {
      setTimeout(() => {
        this.initializeQuill();
      });
    }
  }

  ngAfterViewInit() {
    if (this.editorActive) {
      this.initializeQuill();
    }
  }

  private async initializeQuill() {
    const Quill = (await import('quill')).default;
    this.editor = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ font: [] }, { size: [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ script: 'super' }, { script: 'sub' }],
          [{ header: '1' }, { header: '2' }, 'blockquote', 'code-block'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ direction: 'rtl' }, { align: [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
      },
    });

    this.editor.on('text-change', () => {
      this.post.content = this.editor.root.innerHTML;
    });

    this.initializeQuillWithContent();
  }

  private initializeQuillWithContent() {
    if (this.editor && this.post.content) {
      this.editor.root.innerHTML = this.post.content;
    }
  }

  saveDescription() {
    this.post.content = this.editor.root.innerHTML;
    this.editorActive = false;
  }
}
