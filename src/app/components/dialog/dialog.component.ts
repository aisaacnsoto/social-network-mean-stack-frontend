import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  formGroup: FormGroup;
  title = 'Nuevo';
  buttonTitle = 'Guardar'
  editMode = false;

  constructor(
    private _dialogReference: MatDialogRef<DialogComponent>,
    private _fb: FormBuilder,
    private _postService: PostService,
    @Inject(MAT_DIALOG_DATA) private data: Post
  ) { }

  ngOnInit(): void {
    this.formGroup = this._fb.group({
      content: ['', Validators.required ],
    });

    if (this.data) {
      this.formGroup.patchValue(this.data);
      this.title = 'Edición';
      this.buttonTitle = 'Editar'
      this.editMode = true;
    }
  }

  onActionClick() {
    if (this.formGroup.valid) {
      this.editMode ? this.updateProduct() : this.saveProduct();
    }
  }

  saveProduct() {
    this._postService.create(this.formGroup.value).subscribe({
      next: (data) => this.handleResponse('creado'),
      error: (err) => this.handleError(err)
    });
  }

  updateProduct() {
    this._postService.update(this.data._id, this.formGroup.value).subscribe({
      next: (data) => {
        this.handleResponse('editado');
      },
      error: (err) => this.handleError(err)
    });
  }

  handleResponse(tag: string) {
    this._dialogReference.close(tag);
  }

  handleError(err) {
    console.log(err);
  }

}
