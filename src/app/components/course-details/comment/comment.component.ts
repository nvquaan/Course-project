import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() rateData;
    @Output() delete = new EventEmitter();
    constructor(
    ) { }
    roles
    canDelete: boolean;
    ngOnInit() {
        this.roles = JSON.parse(localStorage.getItem('roles'));
        this.canDelete = this.roles.includes('ROLE_ADMIN' || 'ROLE_MODERATOR')
    }

    deleteRate() {
        this.delete.emit(this.rateData._id);
    }
}
