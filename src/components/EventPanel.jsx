import React from 'react';
import CardRow from '../components/CardRow.jsx';
import '../sass/eventpanel.scss';

function EventPanel() {
	return (
		<div>
			<div>
				<h2 className='events-type'>TRENDING</h2>
				<CardRow />
			</div>
			<div>
				<h2 className='events-type'>MUSIC</h2>
				<CardRow 
					category={'music'}
				/>
			</div>
			<div>
				<h2 className='events-type'>COMEDY</h2>
				<CardRow 
					category={'comedy'}
				/>
			</div>
			<div>
				<h2 className='events-type'>MAGIC</h2>
				<CardRow 
					category={'Magic'}
				/>
			</div>
			<div>
				<h2 className='events-type'>CAMPING</h2>
				<CardRow 
					category={'camping'}
				/>
			</div>

			<div>
				<h2 className='events-type'>RECOMMENDED</h2>
				<CardRow />
			</div>
		</div>

	);
}

export default EventPanel;
