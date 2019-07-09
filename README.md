# elasticupdater
Download, extract and update elastic components from repository

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need node.js to be installed on your system 

### Installing

Just copy files to the folder where you want to run the updater.

### Preparations

Have the folders at hand where elasticupsdater should put the downloaded files

## How to use

Open a terminal or a command line and type following command

`node elasticupdater.js version target-folder`

## Output 

elasticupdater will download the files from the internet to a subfolder it creates called downloads. After this it will extract the files to the given targetfolder creating a subfolder for each component. 

## Built With

* [NodeJS](http://www.nodejs.org) - The javascript framework used

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Thorsten Moeller** - *Initial work* - 

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
