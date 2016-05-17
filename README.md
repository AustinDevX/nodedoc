# doc-pull
A simple command line tool for fetchng nodejs documentation. Inspired by godoc.

usage: doc-pull module_name [-c class_name [-e event_name | -m method_name] ] [-C] [-E] [-M] [-r]

options :
  c   - Specifies the class whose documentation is to be retrieved
  e   - Specifies the event to be retrieved
  m   - Specifies the method to be retrieved
  C   - list the classes associated with this module
  E   - List the events associated with this module
  M   - List the methods associated with this module
  r   - Recursively check the subclasses or submodules of the current target


This project is (unfortunately) highly dependent upon the JSON representation of the NodeJS documentation

The root structure of the document page
  {
    "source": "doc/api/fs.md",
    "modules": []
  }

The root structure of a node module
  {
    "textRaw": "",
    "name": "",
    "stability": ,
    "stabilityText": "",
    "desc": "",
    "classes": []
    "properties": []
    "methods": []
    "type": "",
    "displayName": ""
  }

event
  {
    "textRaw": "Event: 'change'",
    "type": "event",
    "name": "change",
    "params": [],
    "desc": ""
  },

method
  {
    "textRaw": "watcher.close()",
    "type": "method",
    "name": "close",
    "desc": "",
    "signatures": []
  }

class
  {
    "textRaw": "Class: fs.FSWatcher",
    "type": "class",
    "name": "fs.FSWatcher",
    "desc": "",
    "events": [],
    "methods": []
  }

signatures
  {
     "params": [],
     "desc": ""
  }

properties
  {
     "textRaw": "error.message",
     "name": "message",
     "desc": ""
  },
