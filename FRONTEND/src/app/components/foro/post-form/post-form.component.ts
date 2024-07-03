import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostsService } from '../../../services/posts.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
})
export class PostFormComponent implements OnInit, AfterViewInit {
  animalTypes: any[] = [];
  breeds: any[] = [];
  topics: any[] = [];
  selectedAnimalTypeId: number | null = null;
  selectedBreedId: number | null = null;
  selectedTopicId: number | null = null;
  postId: number | null = null;
  editor: any;

  post = {
    animalType: '',
    breed: '',
    topic: '',
    title: '',
    content: '',
    userId: 0,
  };

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadAnimalTypes();
    this.loadTopics();
    this.post.userId = parseInt(localStorage.getItem('userId') || '0', 10);

    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.postId) {
      this.loadPost(this.postId);
    }
  }

  loadAnimalTypes() {
    this.postsService.getAnimalTypes().subscribe((data: any) => {
      const uniqueAnimalTypes = data.filter(
        (item: any, index: number, self: any[]) =>
          index === self.findIndex((t) => t.petTypeId === item.petTypeId)
      );
      this.animalTypes = uniqueAnimalTypes;
    });
  }

  loadTopics() {
    this.postsService.getTopics().subscribe((data: any) => {
      this.topics = data;
    });
  }

  onAnimalTypeChange() {
    const selectedType = this.animalTypes.find(
      (type) => type.name === this.post.animalType
    );
    if (selectedType) {
      this.selectedAnimalTypeId = selectedType.petTypeId;
      if (this.selectedAnimalTypeId !== null) {
        this.postsService
          .getBreedsByType(this.selectedAnimalTypeId)
          .subscribe((data: any) => {
            this.breeds = data;
          });
      }
    }
  }

  loadPost(postId: number) {
    this.postsService.getPostById(postId).subscribe(
      (data: any) => {
        this.post = {
          animalType: data.petTypeName,
          breed: data.petBreedName,
          topic: data.topicName,
          title: data.title,
          content: data.content,
          userId: data.userId,
        };
        this.selectedAnimalTypeId = data.petTypeId;
        this.onAnimalTypeChange();
        this.initializeQuillWithContent();
      },
      (error) => {
        console.error('Error loading post:', error);
      }
    );
  }

  submitForm() {
    const selectedAnimalType = this.animalTypes.find(
      (type) => type.name === this.post.animalType
    );
    const selectedBreed = this.breeds.find(
      (breed) => breed.name === this.post.breed
    );
    const selectedTopic = this.topics.find(
      (topic) => topic.name === this.post.topic
    );

    if (selectedAnimalType && selectedBreed && selectedTopic) {
      const postData = {
        title: this.post.title,
        content: this.post.content,
        userId: this.post.userId,
        petTypeId: selectedAnimalType.petTypeId,
        petBreedId: selectedBreed.petBreedId,
        topicId: selectedTopic.topicId,
      };

      if (this.postId) {
        this.postsService.updatePost(this.postId, postData).subscribe(
          (response) => {
            console.log('Publicación actualizada:', response);
            this.router.navigate(['/thread', this.postId]);
          },
          (error) => {
            console.error('Error al actualizar la publicación:', error);
          }
        );
      } else {
        this.postsService.createPost(postData).subscribe(
          (response) => {
            console.log('Publicación creada:', response);
            this.router.navigate(['/thread', response.postId]);
          },
          (error) => {
            console.error('Error al crear la publicación:', error);
          }
        );
      }
    } else {
      console.error('Datos incompletos para crear la publicación');
    }
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
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
  }

  private initializeQuillWithContent() {
    if (this.editor && this.post.content) {
      this.editor.root.innerHTML = this.post.content;
    }
  }
}
