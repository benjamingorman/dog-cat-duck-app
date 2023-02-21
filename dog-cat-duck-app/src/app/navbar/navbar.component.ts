import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService, TagsResponse } from '../api-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchTags: Record<string, number> = {};

  constructor(
    private api_service: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const self = this;
    this.api_service.getTags().subscribe(
      (data: TagsResponse) => {
        console.log("response", data);
        self.searchTags = data;
      }
    );
  }

  /* Return all tags, sorted by count descending */
  getSortedTags(): Array<string> {
    const tags = Object.keys(this.searchTags);
    tags.sort((a, b) => this.searchTags[b] - this.searchTags[a]);
    return tags;
  }
}