import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

export default function AlternateTimeline() {
    return (
        <Timeline align="alternate">
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti corporis blanditiis vitae commodi dolorem beatae </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>ratione vero cupiditate et, officia itaque, architecto consequatur. Laboriosam, at! Culpa deserunt deleniti aspernatur voluptatum. Esse iure voluptas fugit sunt minima, aperiam, voluptate minus tempora officia eaque assumenda maiores pariatur dolores! Corrupti similique distinctio nobis quos quam in quidem dicta, exercitationem nisi accusamus?</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime consequuntur deleniti corporis blanditiis vitae commodi dolorem beatae ratione vero cupiditate et, officia itaque, architecto consequatur. Laboriosam, at! Culpa deserunt deleniti aspernatur voluptatum.</TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineSeparator>
                    <TimelineDot />
                </TimelineSeparator>
                <TimelineContent>Repeat</TimelineContent>
            </TimelineItem>
        </Timeline>
    );
}