"use strict";

function UIpatternsInit() {
	const win = UIwindows.window( "blocks" );

	UIpatterns.setDAWCore( DAW );
	win.contentAppend( UIpatterns.rootElement );
	gsuiPatterns.selectChanPopupContent.classList.add( "popup" );
}

function UIpatternsBuffersLoaded( buffers ) {
	const patSli = DAW.get.pattern( DAW.get.patternSlicesOpened() );
	const sliBuf = patSli && DAW.get.pattern( patSli.source ).buffer;

	if ( sliBuf in buffers ) {
		UIslicer.rootElement.setBuffer( buffers[ sliBuf ].buffer );
	}
	UIpatterns.bufferLoaded( buffers );
	UIpatternroll.rootElement.getBlocks().forEach( ( elBlc, blcId ) => {
		const blc = DAW.get.block( blcId ),
			pat = DAW.get.pattern( blc.pattern );

		if ( pat.type === "buffer" && pat.buffer in buffers ) {
			UIpatterns.svgForms.buffer.setSVGViewbox( elBlc._gsuiSVGform, blc.offset, blc.duration, DAW.get.bpm() / 60 );
		}
	} );
}

function UIupdatePattern( id, obj ) {
	if ( obj ) {
		if ( "duration" in obj ) {
			const foc = DAW.getFocusedName();

			if ( foc !== "composition" && id === DAW.get.opened( foc ) ) {
				DOM.sliderTime.setAttribute( "max", obj.duration );
			}
		}
		if ( "name" in obj ) {
			const name = obj.name;

			UIpatternroll.rootElement.getBlocks().forEach( blc => {
				if ( blc.dataset.pattern === id ) {
					blc.querySelector( ".gsuiPatternroll-block-name" ).textContent = name;
				}
			} );
			if ( id === DAW.get.patternSlicesOpened() ) {
				DOM.slicesName.textContent = name;
			}
			if ( id === DAW.get.patternKeysOpened() ) {
				DOM.pianorollName.textContent = name;
			}
			if ( id === DAW.get.patternDrumsOpened() ) {
				DOM.drumsName.textContent = name;
			}
		}
	}
}

function UIupdatePatternsBPM( bpm ) {
	const bps = bpm / 60;

	UIpatternroll.rootElement.getBlocks().forEach( ( elBlc, blcId ) => {
		const blc = DAW.get.block( blcId ),
			pat = DAW.get.pattern( blc.pattern ),
			svg = elBlc._gsuiSVGform;

		if ( svg && pat.type === "buffer" ) {
			UIpatterns.svgForms.buffer.setSVGViewbox( svg, blc.offset, blc.duration, bps );
		}
	} );
}
