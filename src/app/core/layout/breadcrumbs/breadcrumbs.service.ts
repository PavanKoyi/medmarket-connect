import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
  private readonly _crumbs = signal<Breadcrumb[]>([]);
  readonly crumbs = this._crumbs.asReadonly();

  constructor(router: Router) {
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const root = router.routerState.snapshot.root;
      this._crumbs.set(this.build(root));
    });

    this._crumbs.set(this.build(router.routerState.snapshot.root));
  }

  private build(snapshot: ActivatedRouteSnapshot, baseUrl = ''): Breadcrumb[] {
    const crumbs: Breadcrumb[] = [];

    const path = snapshot.url.map((s) => s.path).join('/');
    const nextUrl = path ? `${baseUrl}/${path}` : baseUrl;

    const label = snapshot.data?.['breadcrumb'] as string | undefined;
    if (label) crumbs.push({ label, url: nextUrl || '/' });

    for (const child of snapshot.children) {
      crumbs.push(...this.build(child, nextUrl));
    }
    return crumbs;
  }
}

