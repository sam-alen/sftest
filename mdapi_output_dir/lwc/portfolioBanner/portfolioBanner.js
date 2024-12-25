import { LightningElement } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';
export default class PortfolioBanner extends LightningElement {
    
    linkedUrl = ""
    githubUrl = ""
    trailheadUrl = ""


    userPic = `${PortfolioAssets}/PortfolioAssets/userPic.jpeg`;
    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`;
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`;
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`;
    twitter = `${PortfolioAssets}/PortfolioAssets/Social/twitter.svg`;
    trailhead = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`;
}