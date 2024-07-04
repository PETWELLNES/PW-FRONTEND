import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ThreadService } from '../../../services/thread.service';

@Component({
  selector: 'app-thread',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css'],
})
export class ThreadComponent implements AfterViewInit, OnInit {
  thread: any = {};
  responses: any[] = [];
  postId: number | undefined;
  editMode = false;
  editForm: FormGroup;
  currentUserId: number | null = null;
  isCreator: boolean = false;
  editor: any; // Editor de Quill
  editingResponseId: number | null = null; // Para rastrear qué respuesta se está editando
  editResponseForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router,
    private threadService: ThreadService // Asegúrate de inyectar ThreadService
  ) {
    this.editForm = this.fb.group({
      title: [''],
      content: [''],
      petType: [''],
      petBreed: [''],
      category: [''],
    });

    this.editResponseForm = this.fb.group({
      content: [''],
    });
  }

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUser().subscribe((user) => {
      this.currentUserId = user?.userId ? Number(user.userId) : null;
      if (this.postId) {
        this.loadThread();
        this.loadResponses(); // Llamada para cargar los comentarios
      }
    });
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      this.initializeQuill();
    }
  }

  loadThread() {
    if (this.postId) {
      this.postsService.getPostById(this.postId).subscribe(
        (data: any) => {
          this.thread = {
            ...data,
            content: this.sanitizeContent(data.content),
            user: { username: 'Desconocido' },
          };
          this.isCreator = data.userId === this.currentUserId;
          this.editForm.patchValue({
            title: data.title,
            content: data.content,
            petType: data.petType,
            petBreed: data.petBreed,
            category: data.category,
          });
          this.loadUser(data.userId);
        },
        (error) => {
          console.error('Error loading thread:', error);
        }
      );
    }
  }

  loadUser(userId: number) {
    this.usersService.getUserById(userId).subscribe(
      (userData: any) => {
        this.thread.user = userData;
      },
      (error) => {
        console.error('Error loading user data:', error);
      }
    );
  }

  loadResponses() {
    if (this.postId) {
      this.threadService.getResponsesByParentPostId(this.postId).subscribe(
        (data: any) => {
          this.responses = data.map((response: any) => ({
            ...response,
            content: this.sanitizeContent(response.content),
          }));
        },
        (error) => {
          console.error('Error loading responses:', error);
        }
      );
    }
  }

  sanitizeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
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
  }

  submitResponse() {
    const content = this.editor.root.innerHTML.trim();
    if (!content) {
      alert('No se puede enviar un comentario vacío');
      return;
    }

    const response = {
      content,
      postId: this.postId,
      userId: this.currentUserId,
    };

    this.threadService.addResponse(response).subscribe(
      (newResponse) => {
        this.responses.push({
          ...newResponse,
          content: this.sanitizeContent(newResponse.content),
        });
        this.editor.root.innerHTML = ''; // Limpiar el editor después de enviar
      },
      (error) => {
        console.error('Error adding response:', error);
      }
    );
  }

  startEditingResponse(responseId: number, currentContent: string) {
    this.editingResponseId = responseId;
    this.editResponseForm.patchValue({ content: currentContent });
  }

  saveEditedResponse() {
    if (this.editResponseForm.valid && this.editingResponseId !== null) {
      const updatedContent = this.editResponseForm.value.content;
      this.threadService
        .updateResponse(this.editingResponseId, { content: updatedContent })
        .subscribe(
          (updatedResponse) => {
            const index = this.responses.findIndex(
              (r) => r.id === this.editingResponseId
            );
            if (index !== -1) {
              this.responses[index] = {
                ...updatedResponse,
                content: this.sanitizeContent(updatedResponse.content),
              };
            }
            this.editingResponseId = null;
          },
          (error) => {
            console.error('Error updating response:', error);
          }
        );
    }
  }

  cancelEditingResponse() {
    this.editingResponseId = null;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveEdit() {
    if (this.editForm.valid) {
      const updatedThread = {
        ...this.thread,
        ...this.editForm.value,
      };
      if (this.postId) {
        this.postsService.updatePost(this.postId, updatedThread).subscribe(
          (data: any) => {
            this.thread = {
              ...data,
              content: this.sanitizeContent(data.content),
            };
            this.toggleEditMode();
          },
          (error) => {
            console.error('Error saving thread:', error);
          }
        );
      }
    }
  }

  cancelEdit() {
    this.toggleEditMode();
    this.editForm.patchValue({
      title: this.thread.title,
      content: this.thread.content,
      petType: this.thread.petType,
      petBreed: this.thread.petBreed,
      category: this.thread.category,
    });
  }

  redirectToEdit() {
    if (this.isCreator) {
      this.router.navigate([`/post/edit/${this.postId}`]);
      this.toggleEditMode();
    } else {
      this.router.navigate(['/foro']);
    }
  }
}
