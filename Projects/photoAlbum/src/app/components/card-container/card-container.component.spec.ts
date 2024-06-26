import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CardContainerComponent } from './card-container.component';
import { PhotoAlbumService } from '../../services/photo-album.service';
import { albumData } from '../../models/photoLibraryModel';

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let photoAlbumService: PhotoAlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardContainerComponent],
      providers: [
        {
          provide: PhotoAlbumService,
          useValue: {
            onFetchPhotoAlbums: jasmine.createSpy('onFetchPhotoAlbums').and.returnValue(
              of([
                { albumId: 1, id: 1, thumbnailUrl: 'url1' },
                { albumId: 1, id: 2, thumbnailUrl: 'url2' },
                { albumId: 2, id: 1, thumbnailUrl: 'url3' },
                { albumId: 2, id: 2, thumbnailUrl: 'url4' },
              ] as albumData[])
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    photoAlbumService = TestBed.inject(PhotoAlbumService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch albums and populate the data', () => {
    component.onFetchAlbums();
    expect(photoAlbumService.onFetchPhotoAlbums).toHaveBeenCalled();
    expect(component.albumsCollection.length).toBe(2);
    expect(component.albumDropdown.length).toBe(2);
    expect(component.filteredCollection.length).toBe(0);
  });

  it('should filter the albums based on the selected album', () => {
    component.onFetchAlbums();
    component.onChangeAlbum({ value: { albumSearchId: 0 } });
    expect(component.filteredCollection.length).toBe(2);
    expect(component.filteredCollection[0].length).toBe(2);
    expect(component.filteredCollection[1].length).toBe(0);
  });
});
