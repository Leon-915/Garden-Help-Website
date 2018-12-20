'use strict';

import React from 'react';
import $ from 'jquery';

import ImagesUploader from 'react-images-uploader';
import Hologram from 'hologram-image-upload/dist/Hologram';
import 'hologram-image-upload/dist/css/Hologram.css'
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

require('styles/src/components/ImageUploader.css');

class ImageUploaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.headers = {
            'x-access-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDMyOTc5ODM1MjZ9.k9IeUfR5JTynM_VFU2W4gKncE5r20dBwKVaQ8a71QXM','x-key':'ajay.p18@gmail.com'
        }
    }
    myUploadFunc(file, data) {
        var file = new File([new Blob()], data.name, {type:data.type});
        var fromData = new FormData();
        fromData.append('file', file);
        // return new Promise((resolve, reject) => {
        //     var url='http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/utils/image/upload';
        //     var xhr = new XMLHttpRequest;
        //     xhr.addEventListener("error", reject);
        //     xhr.addEventListener("load", resolve());
        //     xhr.open("POST", url, true);
        //     // xhr.setRequestHeader('Content-Type', false);
        //     xhr.setRequestHeader('x-access-token','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDMyNDc4NTMzNzl9.OKsXL75t-gXwGXIMKmbyi6TXS-2GfkRdR9nAyFf8smc');
        //     xhr.setRequestHeader('x-key','ajay.p18@gmail.com');
        //     xhr.send(fromData);
        // });
        return $.ajax({
            url: 'http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/utils/image/upload',
            type: 'POST',
            headers: {
                'x-access-token':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MDMyOTc5ODM1MjZ9.k9IeUfR5JTynM_VFU2W4gKncE5r20dBwKVaQ8a71QXM','x-key':'ajay.p18@gmail.com'
            },
            data: fromData,
            contentType: false,
            processData: false,
            beforeSend: function () {
                this.setState({loading: true});
            }.bind(this)
        })
    }
    render() {
        return (
            // <ImagesUploader
            //     url='http://ec2-52-208-229-193.eu-west-1.compute.amazonaws.com:9000/gardenhelp/api/v1/utils/image/upload'
            //     headers={this.headers}
            //     multiple={true}
            //     optimisticPreviews
            //     dataName="file"
            //     onLoadEnd={(err) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //     }}
            //     label = 'Upload multiple images'
            // />

            <Hologram uploadFunction={this.myUploadFunc.bind(this)} ></Hologram>
        );
    }
}

ImageUploaderComponent.displayName = 'SrcComponentsImageUploaderComponent';

// Uncomment properties you need
// ImageUploaderComponent.propTypes = {};
// ImageUploaderComponent.defaultProps = {};

export default ImageUploaderComponent;
