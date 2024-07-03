import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UsersService } from '../../../services/users.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

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

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private usersService: UsersService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: [''],
      content: [''],
      petType: [''],
      petBreed: [''],
      category: [''],
    });
  }

  ngOnInit() {
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.authService.getUser().subscribe((user) => {
      this.currentUserId = user?.userId ? Number(user.userId) : null;
      if (this.postId) {
        this.loadThread();
        this.loadResponses();
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
      this.postsService.getResponsesByParentPostId(this.postId).subscribe(
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
    const editor = new Quill('#editor-container', {
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
