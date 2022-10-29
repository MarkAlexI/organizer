# organizer
Daily organizer. Schedule with notes.
---
For installation dependencies used script `install-dep`.
For starting project used script `build`.
For using Hot Reload run `watch`.
`prod` is production mode for webpack.
![Calendar](/calendar.png "Calendar")
Use the buttons to navigate the Calendar. To select a date, click on it. Enter text in Textarea and use the buttons to work with it:
- Save - to save to IndexedDB
- Clear - to remove text
- Copy - to place in clipboard

The entry is saved as a hyperlink with a title in the format 'hh:mm:ss'. The date with notes in the Calendar is highlighted in orange. Clicking on a date will open a list of notes. Clicking on the link opens the note in Textarea. The active date is shown in the header.
