import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import {DropzoneDialog} from 'material-ui-dropzone';

function ImgUpload({ details, setDetails, open, setOpen, handleChange, files, setFiles, filesLimit }) {
	const [ posting, setPosting ] = useState(false);

	function handleClose() {
		setOpen(false);
	}

	function handleSave(nfiles) {
		setFiles(nfiles);
		setPosting(true);
		const formData = new FormData();
		if(nfiles)
		{
			formData.append(
				'image',
				nfiles[0],
				nfiles[0].name
			);
			axios
				.post(process.env.REACT_APP_SERVER_URL + '/public/images', formData)
				.then(res => {
					setDetails({...details, image_url: res?.data?.url});
					setPosting(false);
				})
				.catch(err => console.log(err));
		}
		setOpen(false);
	}

	function handleOpen() {
		setOpen(true);
	}

	if(posting) {
		return (
			<div>
            Uploading ...
			</div>
		);
	}
	if(details.image_url) {
		return (
			<div className='image-container'>
				<Button onClick={() => setDetails({...details, image_url: null}) }
					style={{
						position: 'absolute',
						transform: `translate(${-50}%, ${-50}%)`, 
						backgroundColor: '#555',
						color: 'white',
						minHeight: '2.5rem',
						minWidth: '2.5rem',
						borderRadius: '5rem',
					}}
				>
                x
				</Button>
				<img alt="f bruh" className='upload-img' src={details.image_url}></img>
			</div>
		);
	}
	return(
		<div className='upload-container'>
			<TextField
				fullWidth
				id="image_url"
				label="Banner Image URL"
				margin="normal"
				name="image_url"
				onChange={handleChange}
				value={details.image_url}
				variant="outlined"
			/>
			<div>
				<Button onClick={handleOpen}>
                    or Upload Image
				</Button>
				<DropzoneDialog
					acceptedFiles={['image/jpeg', 'image/png']}
					filesLimit={filesLimit}
					maxFileSize={5000000}
					onClose={handleClose}
					onSave={handleSave}
					open={open}
					showPreviews={true}
				/>
			</div>
		</div>
	);
}

export default ImgUpload;