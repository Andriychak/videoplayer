import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

  public videos: Array<Video>;

  public selectedVideo: Video;

  public hideNewVideoForm: boolean = true;

  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe(data => this.videos = data);
  }

  onSelectVideo(video: any) {
    this.selectedVideo = video;
    this.hideNewVideoForm = true;
  }

  onSubmitNewVideo(video: Video) {
    this.videoService.addVideo(video).subscribe(data => {
      this.videos.push(data);
      this.selectedVideo = data;
      this.hideNewVideoForm = true;
    });
  }

  onUpdateVideoEvent(video) {
    this.videoService.updateVideo(video).subscribe(data => video = data);
    this.selectedVideo = null;
  }

  onDeleteVideoEvent(video: Video) {
    this.videoService.deleteVideo(video).subscribe(data => {
      let videoArray = this.videos;
      for (let index = 0; index < videoArray.length; index++) {
        if (data._id === videoArray[index]._id) {
          videoArray.splice(index, 1);
        };
      }
    });
    this.selectedVideo = null;
  }

  newVideoForm() {
    this.hideNewVideoForm = false;
  }

}
