"use strict";

const UIhistoryActions = new Map();

function UIhistoryInit() {
	DAW.cb.historyUndo = act => UIhistoryActions.get( act.index ).classList.add( "historyAction-undone" );
	DAW.cb.historyRedo = act => UIhistoryActions.get( act.index ).classList.remove( "historyAction-undone" );
	DAW.cb.historyAddAction = UIhistoryAddAction;
	DAW.cb.historyDeleteAction = UIhistoryDeleteAction;
	DOM.undo.onclick = () => DAW.history.undo();
	DOM.redo.onclick = () => DAW.history.redo();
}

function UIhistoryAddAction( act ) {
	const div = GSUI.getTemplate( "historyAction", act );

	div.onclick = () => DAW.history.goToAction( act );
	UIhistoryActions.set( act.index, div );
	DOM.historyList.append( div );
	DOM.historyList.scrollTop = 10000000;
}

function UIhistoryDeleteAction( { index } ) {
	UIhistoryActions.get( index ).remove();
	UIhistoryActions.delete( index );
}
