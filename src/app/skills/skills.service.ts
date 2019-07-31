import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ApiResponse } from './interfaces';

const SKILL_QUERY = gql`
  query getSkills {
    skills {
      name
      documentationUrl
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  constructor(private apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({ uri: 'http://localhost:3000/graphql' }),
      cache: new InMemoryCache()
    });
  }

  getSkills() {
    return this.apollo.watchQuery<ApiResponse>({
      query: SKILL_QUERY
    });
  }
}
