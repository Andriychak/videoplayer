import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Video } from './video';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class VideoService {

  private getUrl = "/api/videos";
  private postUrl = "/api/video";
  private putUrl = "/api/video/";
  private deleteUrl = "/api/video/";

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.getUrl);
  }

  addVideo(video: Video): Observable<Video> {
    return this.http.post<Video>(this.postUrl, video, httpOptions);
  }

  updateVideo(video: Video): Observable<Video> {
    return this.http.put<Video>(this.putUrl + video._id, video, httpOptions);
  }

  deleteVideo(video: Video): Observable<Video> {
    return this.http.delete<Video>(this.deleteUrl + video._id, httpOptions);
  }
}
