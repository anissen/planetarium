
/*
myData =
    a: "a string"
    b: 0
    c:
        d: [1,2,3]
        e: ["another", "array"]
    f: false

games = 
	title: "Rigid Body Editor"
	year: 2007
	description: "This is the description."
	images: {src: "rbe.png", title: "This is the main screen"}
*/

var games;

games = {
  "projects": {
    "project": [
      {
        "name": "Flying Carpet",
        "year": "2010",
        "description": {
          "short": "Simple Arduino controlled game",
          "long": "The Flying Carpet game was made for the course '3D Prototyping' on the IT programme at the University of Aarhus. Its purpose was to provide a simple game that could be controlled by a physical controller device using sensors attached to an Arduino board. See https://sites.google.com/site/flyingcarpetsim/"
        }
      }, {
        "name": "Behavior Tree Workbench",
        "year": "2010",
        "description": {
          "short": "Tool for designing behavior for agents in games",
          "long": "The 'Behavior Tree Workbench' was my thesis project. The purpose of the workbench is to make it easy and intuitive to design behavior of agents in computer games. See https://sites.google.com/site/behaviortreeeditor"
        }
      }, {
        "name": "Sim Shitty MMO",
        "year": "2009",
        "description": {
          "short": "Peer-to-peer online game",
          "long": "An online game without any central component where all game state is distributed across the participating players. In the game you are a camel and can chat with other camels as well as dropping and picking up pieces of poo."
        }
      }, {
        "name": "Motivation-based Behavior Simulation",
        "year": "2009",
        "description": {
          "short": "Evolution simulation",
          "long": "Experiment using genetics and motivation-based behavior to simulate evolution. See htt//daimi.au.dk/~anissen/motivation"
        }
      }, {
        "name": "Fluid Simulation",
        "year": "2009",
        "description": {
          "short": "3D offline smoke simulation",
          "long": "???"
        },
        "resources": {
          "dir": "fluids",
          "logo": "fluids.jpg",
          "videos": {
            "video_show_case": {
              "vimeo_album_id": "106407"
            }
          }
        }
      }, {
        "name": "Dungeon Simulation",
        "year": "2009",
        "description": {
          "short": "???",
          "long": "???"
        },
        "resources": {
          "dir": "dungeonsim",
          "logo": "dungeon_sim.jpg",
          "pictures": {
            "slide_show": {
              "picasa_album_id": "F5392965868515289905"
            }
          }
        }
      }, {
        "name": "Behavior Simulation",
        "year": "2008",
        "description": {
          "short": "???",
          "long": "???"
        },
        "resources": {
          "dir": "behaviorsim",
          "logo": "bs.jpg"
        }
      }, {
        "name": "Beaten Traxx",
        "year": "2008",
        "description": {
          "short": "???",
          "long": "See www.openengine.dk"
        },
        "resources": {
          "dir": "beatentraxx",
          "logo": "bt.png",
          "videos": {
            "video": {
              "vimeo_id": "5050786"
            }
          },
          "pictures": {
            "slide_show": {
              "picasa_album_id": "F5392962350646922449"
            }
          }
        }
      }, {
        "name": "OpenEngine",
        "year": "2007",
        "description": {
          "short": "Modular cross-platform 3D framework",
          "long": "See www.openengine.dk"
        },
        "resources": {
          "dir": "openengine",
          "logo": "oe_logo.jpg",
          "videos": {
            "video": {
              "vimeo_id": "5050786"
            }
          }
        }
      }, {
        "name": "Rigid Body Editor",
        "year": "2007",
        "description": {
          "short": "3D rigid body editor",
          "long": "Blah blah"
        },
        "resources": {
          "dir": "rigidbodyeditor",
          "logo": "rigidbodyeditor.jpg",
          "pictures": {
            "picture": [
              {
                "src": "projects/rigidbodyeditor/rigidbodyeditor.jpg",
                "name": "Something"
              }, {
                "src": "projects/rigidbodyeditor/importGeometry.png",
                "name": "Weeee"
              }, {
                "src": "projects/rigidbodyeditor/rbe_logo.jpg",
                "name": "Afs"
              }
            ]
          },
          "videos": {
            "video_show_case": {
              "vimeo_album_id": "96014"
            }
          }
        }
      }, {
        "name": "Four Elements",
        "year": "2007",
        "description": {
          "short": "???",
          "long": "???"
        }
      }, {
        "name": "Mosquitoes!",
        "year": "2007",
        "description": {
          "short": "3D-cinema boids demo",
          "long": "Blah blah"
        },
        "resources": {
          "dir": "myg",
          "logo": "myg_logo.jpg"
        }
      }, {
        "name": "QuestBoard",
        "year": "2006",
        "description": {
          "short": "???",
          "long": "???"
        }
      }, {
        "name": "Ignite",
        "year": "2006",
        "description": {
          "short": "???",
          "long": "An editor allowing the viewing and modification of particle systems."
        },
        "resources": {
          "dir": "ignite",
          "pictures_old": "      "
        }
      }, {
        "name": "WikiAdventure",
        "version": "1.0",
        "year": "2005",
        "description": {
          "short": "Wiki-based game framework",
          "long": "An experimental adventure game framework based on the Wiki principles,      where everyone can edit, add and remove contents. The framework is geared toward classic point-and-click adventure games."
        },
        "resources": {
          "dir": "wikiadventure",
          "logo": "ingame.jpg",
          "pictures": {
            "slide_show": {
              "picasa_album_id": "F5389029839584837873"
            }
          },
          "videos": {
            "video": {
              "vimeo_id": "5050942"
            }
          }
        }
      }, {
        "name": "Arch",
        "year": "2004",
        "resources": {
          "dir": "arch",
          "logo": "arch.jpg"
        }
      }, {
        "name": "Meteor Impact",
        "year": "2004",
        "description": {
          "short": "Fast-paced arcade shooter",
          "long": "Action-packed arcade game in which you are responsible for shooting down meteors before they crash into the Earth. Features lots of different power-ups, a great sound-track and a very retro-feel. Complete game."
        }
      }, {
        "name": "AMIS",
        "year": "2004",
        "description": {
          "short": "Tactical game prototype",
          "long": "Top-down tactical action game prototype inspired by the gameplay in games like Metal Gear Solid. It features path finding, field-of-view and an AI that patrols, hunts a spotted player and alerts other guards."
        },
        "resources": {
          "dir": "amis",
          "videos": {
            "video": {
              "vimeo_id": "8301381"
            }
          }
        }
      }
    ]
  }
};
