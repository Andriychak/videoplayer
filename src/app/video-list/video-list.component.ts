import { Component, OnInit, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Video } from '../video';

@Component({
    selector: 'video-list',
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.css'],
    inputs: ['videos'],
    outputs: ['SelectVideo']
})
export class VideoListComponent implements OnInit, OnChanges {

    public SelectVideo = new EventEmitter(true); // isAsync = true - to avoid ExpressionChangedAfterItHasBeenCheckedError error

    public videos: Array<Video>;
    public selectedVideo: Video;

    constructor() { }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            let change = changes[propName];
            if (propName === 'videos' && !change.previousValue && change.currentValue && this.videos) {
                this.onSelect(this.videos[0]);
                //need to use Promise to avoid ExpressionChangedAfterItHasBeenCheckedError error
                //Promise.resolve(null).then(() => this.onSelect(this.videos[0]));
            }
        }
    }

    onSelect(video: Video) {
        this.SelectVideo.emit(video);
        this.selectedVideo = video;
    }

}
