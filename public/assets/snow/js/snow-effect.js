/*
 Part of Project: Ador Snow Simulation.
 (c): Ador Design (S. Bzdak / F. Bzdak) (all rights reserved). All Changes need approval.
 Usage is not allowed without permission by Ador Design.
 Publishing is not allowed without consent by Ador Design (S. Bzdak or F. Bzdak).
 */

var _adFlashes = null;
var _adSnowSim = null;

var IMG_FILE_PATH = "/assets/snow/images/";							// release path

var _goAdorSnowInitVals = {
	snowDivId: null,
	zVal: null,
	bckImg: null,
	x1: null,
	x2: null,
	x3: null,
	a: null,
	b: null,
	c: null
};

function goAdorSnow(snowDivId, zVal, bckImg, enableSnowBck, enableBckImg, enableFlashes, snowAmount, turbulenceVal, fallSpeed) {
	// remember initial values
	_goAdorSnowInitVals.snowDivId = snowDivId;
	_goAdorSnowInitVals.zVal = zVal;
	_goAdorSnowInitVals.bckImg = bckImg;
	_goAdorSnowInitVals.x1 = enableSnowBck;
	_goAdorSnowInitVals.x2 = enableBckImg;
	_goAdorSnowInitVals.x3 = enableFlashes;
	_goAdorSnowInitVals.a = snowAmount;
	_goAdorSnowInitVals.b = turbulenceVal;
	_goAdorSnowInitVals.c = fallSpeed;

	_adSnowSim = new SnowSimulation();

	_adSnowSim.ador_fb_action(IMG_FILE_PATH, snowDivId, "", zVal);
	_adSnowSim.enableSnowBackground(enableSnowBck);
	_adSnowSim.enableBackgroundImg(enableBckImg);
	if(enableBckImg) {
		_adSnowSim.setBackgroundImage(bckImg);
	}
	_adSnowSim.enableFlashes(enableFlashes);
	_adSnowSim.setSnowAmount(snowAmount);
	_adSnowSim.setTurbulence(turbulenceVal);
	_adSnowSim.setFallSpeed(fallSpeed);
}
window['goAdorSnow'] = goAdorSnow;

/**
 * Snowflake 'Class' to hold the main values of each snowflake
 * @constructor
 */
function Snowflake (id, top, left, size, speedScaler )
{
	this.id = id;
	this.top = top;
	this.left = left;
	this.leftInit = this.left;
	this.leftPxChangePerUpdate = 0;
	this.countTotalLeftUpdMoves = 0;
	this.countRemainingLeftUpdMoves = 0;
	this.size = size;
	this.speedScaler = speedScaler;
	this.velociySmoothThreshold = 0;
}

function getSnowflakes( size ) {
	var snowImgArray = [];
	if( size <= 10 ) {
		snowImgArray.push( "snowflake01_10px.png" );
		snowImgArray.push( "snowflake02_10px.png" );
		snowImgArray.push( "snowflake03_10px.png" );
		snowImgArray.push( "snowflake04_10px.png" );
	}
	else if( size <= 20 ) {
		snowImgArray.push( "snowflake01_20px.png" );
		snowImgArray.push( "snowflake02_20px.png" );
		snowImgArray.push( "snowflake03_20px.png" );
		snowImgArray.push( "snowflake04_20px.png" );
	}
	else if( size <= 30 ) {
		snowImgArray.push( "snowflake01_30px.png" );
		snowImgArray.push( "snowflake02_30px.png" );
		snowImgArray.push( "snowflake03_30px.png" );
		snowImgArray.push( "snowflake04_30px.png" );
	}
	else {
		snowImgArray.push( "snowflake01_40px.png" );
		snowImgArray.push( "snowflake02_40px.png" );
		snowImgArray.push( "snowflake03_40px.png" );
		snowImgArray.push( "snowflake04_40px.png" );
	}

	return snowImgArray;
}

/**
 * @constructor
 */
function SnowSimulation() {

	var self = this;

	// Configuration Constants
	self.BCK_FI = false;
	self.BCK_FIA = false;
	self.SBCK_A = false;
	self.F_A = false;
	self.S_HD = 80;
	self.S_HMM = 300;
	self.S_HSMM = 30;
	self.E_UR = 33;
	self.S_FS = 1800;
	self.S_BS = 220;
	self.S_BA = 0.4;
	self.S_BFIT = 5.5;
	self.S_FMS = 0.2;
	self.S_HS = 40;
	self.MST = 3500;
	self.S_SPS = 20;
	self.CPRV = 100;
	self.S_SVO = 16;
	self.MDWO = 17;
	self.SF_SM = 4;
	self.SF_SMA = 40;
	self.S_HVST = 100;
	self.S_HVSV = 0.1;
	self.F_ST = 0.5;
	self.F_ET = 99999999;

	// Calculated Constants
	self.S_VMMPS = 0;
	var e_updr_sec = self.E_UR / 1000;
	self.SF_ST = 1000 / self.S_SPS;
	self.S_HCA = 10;
	self.S_FPPU = self.S_FS * e_updr_sec;
	self.S_HMPPU = self.S_HS * e_updr_sec;
	self.S_BSPPU = self.S_BS * e_updr_sec;
	self.S_BFIAIPU = self.S_BA * e_updr_sec / self.S_BFIT;

	// Core data members
	self.m_intervalID = -1;
	self.m_snowImg10pxArray = [];
	self.m_snowImg20pxArray = [];
	self.m_snowImg30pxArray = [];
	self.m_snowImg40pxArray = [];
	self.m_sfArray = [];
	self.snowflakesTRArray = [];
	self.m_windowWidth = 100;
	self.m_windowHeight = 100;
	self.m_randHNumbers = [];
	self.m_randVNumbers = [];
	self.m_randHSpawnNumbers = [];
	self.m_sfSizeToSpSArray = [];
	self.m_sfRandSPTable = [];
	self.m_sfImgDivPSArray = [];
	self.m_snowflakeImgDiv = null;
	self.m_snowflakeCanvas = null;
	self.m_canvasContext = null;
	self.m_fallingSnowBackgroundImg = null;
	self.m_snowBackgroundDestHeight = null;
	self.m_snowBackgroundDestY = null;
	self.m_snowBackgroundDestYMax = null;
	self.m_snowBackgroundLoopingY = null;
	self.m_snowBackgrdImgClipX = null;
	self.m_snowFadeInAlphaValue = 0;
	self.m_updateFlashes = false;
	self.m_wAspREffect = -1;
	self.m_imgFilePath = '';
	self.m_productDivId = '';

	// Refresh-controlling members
	self.m_snowIdCount = 0;
	self.m_sCurII = 0;
	self.m_snowflakeSpawnTimer = 0;
	self.m_randHArrayRI = 0;
	self.m_randVArrayRI = 0;
	self.m_randHSArrayRI = 0;
	self.m_sfRBot = false;
	self.m_smSf = 10000;

	self.updateSnowflakeSpawnThreshold = function() {
		self.SF_ST = 1000 / self.S_SPS;
	};

	self.updateSnowBackgroundSpeedPxPerUpd = function() {
		self.S_BSPPU = self.S_BS * e_updr_sec;
	};

	self.updateSnowFallPxPerUpd = function() {
		self.S_FPPU = self.S_FS * e_updr_sec;
	};

	self.updateSnowHorMovePxPerUpd = function()
	{
		self.S_HMPPU = self.S_HS * e_updr_sec;
	};

	self.setSnowStylePosition = function( value ) {
		self.m_backgroundDiv.style.position = value;
		self.m_snowflakeCanvas.style.position = value;
	};

	self.setSnowZIndex = function( zIndex )
	{
		self.m_snowflakeCanvas.style.zIndex = zIndex;
		self.m_backgroundDiv.style.zIndex = zIndex - 1;
	};

	// enable or disable the falling snow background image
	self.enableSnowBackground = function( enable ) {
		self.SBCK_A = enable;
	};

	self.setBackgroundImage = function ( value ) {
		if( typeof (value) == 'undefined' || !value || value == 'none' ) {
			self.BCK_FI = 'none';
		}
		else {
			self.BCK_FI = 'url(' + self.m_imgFilePath + value + ')'
		}
		self.m_backgroundDiv.style.backgroundImage = self.BCK_FI;
	};

	// enable or disable the fix background image
	self.enableBackgroundImg = function( enable ) {
		self.BCK_FIA = enable;
		if( typeof (self.m_backgroundDiv) != 'undefined' ) {
			if (self.BCK_FIA) {
				self.setBackgroundImage(self.BCK_FI);
			}
			else {
				self.setBackgroundImage(false);
			}
		}
	};

	// enable or disable the flashes
	self.enableFlashes = function( enable ) {
		self.F_A = enable;
		self.m_updateFlashes = enable;
		if( enable ) {
			self.initFlashesTimer();
		}
	};

	self.setSnowAmount = function ( snowAmount ) {
		if( snowAmount < 0.2 ) {
			self.S_SPS = 1;
			self.S_BA = 0.2;
		}
		else if( snowAmount < 0.4 ) {
			self.S_SPS = 2;
			self.S_BA = 0.3;
		}
		else if( snowAmount < 0.6 ) {
			self.S_SPS = 17;
			self.S_BA = 0.4;
		}
		else if( snowAmount < 0.8 ) {
			self.S_SPS = 30;
			self.S_BA = 0.5;
		}
		else {
			self.S_SPS = 60;
			self.S_BA = 0.5;
		}

		self.updateSnowflakeSpawnThreshold();
	};

	self.setTurbulence = function( turbulenceValue ) {
		if( turbulenceValue < 0.05 ) {
			self.S_HS = 0.001;
			self.S_HMM = 0;
		}
		else if( turbulenceValue < 0.15 ) {
			self.S_HS = 1;
			self.S_HMM = 10;
		}
		else if( turbulenceValue < 0.25 ) {
			self.S_HS = 3;
			self.S_HMM = 26;
		}
		else if( turbulenceValue < 0.35 ) {
			self.S_HS = 5;
			self.S_HMM = 36;
		}
		else if( turbulenceValue < 0.45 ) {
			self.S_HS = 7;
			self.S_HMM = 50;
		}
		else if( turbulenceValue < 0.55 ) {
			self.S_HS = 11;
			self.S_HMM = 77;
		}
		else if( turbulenceValue < 0.65 ) {
			self.S_HS = 14;
			self.S_HMM = 100;
		}
		else if( turbulenceValue < 0.75 ) {
			self.S_HS = 22;
			self.S_HMM = 170;
		}
		else if( turbulenceValue < 0.85 ) {
			self.S_HS = 40;
			self.S_HMM = 300;
		}
		else if( turbulenceValue < 0.95 ) {
			self.S_HS = 85;
			self.S_HMM = 550;
		}
		else {
			self.S_HS = 145;
			self.S_HMM = 1100;
		}

		self.precalculateRandNumMoveHor();
		self.updateSnowHorMovePxPerUpd();
	};

	self.setFallSpeed = function( fallSpeed ) {
		if( fallSpeed < 0.05 ) {
			self.S_FS = 200;
		}
		else if( fallSpeed < 0.15 ) {
			self.S_FS = 300;
		}
		else if( fallSpeed < 0.25 ) {
			self.S_FS = 450;
		}
		else if( fallSpeed < 0.35 ) {
			self.S_FS = 600;
		}
		else if( fallSpeed < 0.45 ) {
			self.S_FS = 800;
		}
		else if( fallSpeed < 0.55 ) {
			self.S_FS = 1000;
		}
		else if( fallSpeed < 0.65 ) {
			self.S_FS = 1400;
		}
		else if( fallSpeed < 0.75 ) {
			self.S_FS = 1800;
		}
		else if( fallSpeed < 0.85 ) {
			self.S_FS = 2500;
		}
		else if( fallSpeed < 0.95 ) {
			self.S_FS = 3200;
		}
		else {
			self.S_FS = 3800;
		}

		self.S_BS = 0.5 * self.S_FS;
		self.updateSnowFallPxPerUpd();
		self.updateSnowBackgroundSpeedPxPerUpd();
	};

	self.updateEffect = function ()
	{
		// clear the canvas
		self.m_snowflakeCanvas.width = self.m_snowflakeCanvas.width;

		// update and draw snow background image
		self.updateSnowBackground();

		// update flashes if needed
		if( self.m_updateFlashes )
		{
			self.m_updateFlashes = _adFlashes.updateFlashes();
		}

		// update current snowflakes
		for( var i = 0; i < self.m_sfArray.length; i++ )
		{
			var updateCurrentSnowflake = false;

			// let it snow
			updateCurrentSnowflake = self.snowflakeFalling( i );

			// update the actual values when necessary
			if( updateCurrentSnowflake ) {
				self.updateSnowflakes(i);
			}
		}

		for( var delF = 0; delF < self.snowflakesTRArray.length; delF++ )
		{
			self.resetSnowflake( self.snowflakesTRArray[delF] - delF );
		}
		self.snowflakesTRArray = [];

		// spawn new snowflakes
		if( self.m_snowflakeSpawnTimer <= 0 )
		{
			self.m_snowflakeSpawnTimer = self.SF_ST;
			if( self.m_sfArray.length < self.MST ) {
				for (var j = 0; j < self.S_HCA; j++) {
					self.setNewSnowflake(j);
				}
			}
		}

		self.m_snowflakeSpawnTimer -= self.E_UR;
	};

	self.snowflakeFalling = function ( i )
	{
		// manage horizontal movement update
		self.manageHorizontalMovement( i );

		// manage vertical movement update
		return self.manageVerticalMovement( i );
	};

	self.manageHorizontalMovement = function ( i )
	{
		if( self.m_sfArray[i].countRemainingLeftUpdMoves <= 0 )
		{
			var horMove = self.getRandomHorizontalMovement() * self.m_sfSizeToSpSArray[ self.m_sfArray[i].size - self.SF_SM ];
			self.m_sfArray[i].leftPxChangePerUpdate = horMove * self.S_HMPPU;
			self.m_sfArray[i].countTotalLeftUpdMoves = Math.abs( Math.floor(horMove / self.S_HMPPU) );
			self.m_sfArray[i].countRemainingLeftUpdMoves = self.m_sfArray[i].countTotalLeftUpdMoves;
			self.m_sfArray[i].velociySmoothThreshold = self.m_sfArray[i].countTotalLeftUpdMoves - ( self.m_sfArray[i].countTotalLeftUpdMoves / 100 * self.S_HVST );
		}
		var leftShift = 0;
		if( self.m_sfArray[i].countTotalLeftUpdMoves > 0 )
		{
			leftShift = self.m_sfArray[i].leftPxChangePerUpdate * self.m_sfArray[i].countRemainingLeftUpdMoves / self.m_sfArray[i].countTotalLeftUpdMoves;

			if( self.m_sfArray[i].countRemainingLeftUpdMoves >= self.m_sfArray[i].velociySmoothThreshold )
			{
				leftShift *= self.S_HVSV;
			}
		}
		self.m_sfArray[i].left += leftShift;
		self.m_sfArray[i].countRemainingLeftUpdMoves -= 1;
		if( self.m_sfArray[i].left > self.m_windowWidth )
		{
			self.m_sfArray[i].left = self.m_sfArray[i].left - self.m_sfArray[i].size - Math.floor(self.m_sfArray[i].left);
		}
		else if( self.m_sfArray[i].left < self.m_sfArray[i].size * (-1) )
		{
			self.m_sfArray[i].left = self.m_windowWidth + ( self.m_sfArray[i].left - Math.floor(self.m_sfArray[i].left) );
		}
	};

	self.manageVerticalMovement = function ( i )
	{
		if( self.m_sfArray[i].top > (self.m_windowHeight + self.S_SVO) )
		{
			self.snowflakesTRArray.push(i);
			return false;
		}

		// manage vertical movement update
		self.m_sfArray[i].top += self.S_FPPU * self.m_sfSizeToSpSArray[ self.m_sfArray[i].size - self.SF_SM ];

		// return true to indicate the snowflakes vertical movement was updated and the snowflake can be drawn
		return true;
	};

	self.updateSnowflakes = function ( i )
	{
		var snowflake = self.m_sfImgDivPSArray[self.m_sfArray[i].size][self.m_sfArray[i].id];
		self.m_canvasContext.drawImage(snowflake, Math.floor(self.m_sfArray[i].left), Math.floor(self.m_sfArray[i].top), self.m_sfArray[i].size, self.m_sfArray[i].size);
	};

	self.setNewSnowflake = function ( i )
	{
		// get a size for the new snowflake
		var size = self.getSnowflakeSize();
		if ( !self.m_sfRBot )
		{
			if( self.m_smSf > self.SF_SM )
			{
				if( size < self.m_smSf )
				{
					self.m_smSf = size;
				}
			}
		}
		var speedScaler = self.getSnowflakeSpeedScaleFromSize( size );
		var topDist = self.getRandomVerticalMovement() - self.S_SVO;
		var leftDist = self.getRandomHorizontalSpawnMovement() + (i * self.S_HD);

		var snowflake = new Snowflake( self.getSnowflakeImgId(size), topDist, leftDist, size, speedScaler );
		var newSnowflakeIndex = self.m_sfArray.push( snowflake ) - 1;

		// draw it to the canvas
		self.m_canvasContext.drawImage(self.m_sfImgDivPSArray[size.toString()][snowflake.id], leftDist, topDist, size, size);
	};

	self.getSnowflakeSize = function ()
	{
		var randomNum = Math.random();
		for( var i = 0; i < self.m_sfSizeToSpSArray.length; i++ )
		{
			if( randomNum <= self.m_sfRandSPTable[i] )
			{
				return i + self.SF_SM;
			}
		}
		return self.SF_SMA;
	};

	self.getSnowflakeSpeedScaleFromSize = function ( size )
	{
		var index = size - self.SF_SM;
		if( index >= 0 )
		{
			return self.m_sfSizeToSpSArray[index];
		}
		return self.m_sfSizeToSpSArray[0];
	};

	self.resetSnowflake = function ( snowflakeArrayId )
	{
		self.m_sfArray.splice( snowflakeArrayId, 1 );
	};

	self.updateSnowBackground = function ()
	{
		if( self.SBCK_A ) {
			if (!isNaN(self.m_snowBackgroundDestHeight) && self.m_snowBackgroundDestHeight != null) {
				// set alpha value of snow background with respect to fade in time
				if (self.m_snowFadeInAlphaValue < self.S_BA) {
					self.m_canvasContext.globalAlpha = self.m_snowFadeInAlphaValue;
					self.m_snowFadeInAlphaValue += self.S_BFIAIPU;
				}
				// set alpha value of snow background after fade in time
				else {
					self.m_canvasContext.globalAlpha = self.S_BA;
				}

				self.m_snowBackgroundDestY = self.m_snowBackgroundLoopingY;
				self.m_snowBackgroundDestYMax = self.m_snowBackgroundDestY;

				if (self.m_snowBackgroundDestY > 0) {
					self.m_canvasContext.drawImage(self.m_fallingSnowBackgroundImg, 0, 0, self.m_snowBackgrdImgClipX, self.m_fallingSnowBackgroundImg.height, 0, self.m_snowBackgroundDestY - self.m_snowBackgroundDestHeight, self.m_snowflakeCanvas.width, self.m_snowBackgroundDestHeight);
				}
				while (self.m_snowflakeCanvas.height > self.m_snowBackgroundDestYMax) {
					self.m_canvasContext.drawImage(self.m_fallingSnowBackgroundImg, 0, 0, self.m_snowBackgrdImgClipX, self.m_fallingSnowBackgroundImg.height, 0, self.m_snowBackgroundDestY, self.m_snowflakeCanvas.width, self.m_snowBackgroundDestHeight);
					self.m_snowBackgroundDestY += self.m_snowBackgroundDestHeight;
					self.m_snowBackgroundDestYMax += self.m_snowBackgroundDestHeight;
				}
				self.m_snowBackgroundLoopingY += self.S_BSPPU;
				if (self.m_snowBackgroundLoopingY > self.m_snowBackgroundDestHeight) {
					self.m_snowBackgroundLoopingY -= self.m_snowBackgroundDestHeight;
				}
				self.m_canvasContext.globalAlpha = 1.0;
			}
		}
	};

	self.getRandomHorizontalMovement = function ()
	{
		self.m_randHArrayRI++;
		if( self.m_randHArrayRI >= self.CPRV )
		{
			self.m_randHArrayRI = 0;
		}
		return self.m_randHNumbers[ self.m_randHArrayRI ];
	};

	self.getRandomVerticalMovement = function ()
	{
		self.m_randVArrayRI++;
		if( self.m_randVArrayRI >= self.CPRV )
		{
			self.m_randVArrayRI = 0;
		}
		return self.m_randVNumbers[ self.m_randVArrayRI ];
	};

	self.getRandomHorizontalSpawnMovement = function ()
	{
		self.m_randHSArrayRI++;
		if( self.m_randHSArrayRI >= self.CPRV )
		{
			self.m_randHSArrayRI = 0;
		}
		return self.m_randHSpawnNumbers[ self.m_randHSArrayRI ];
	};

	self.getSnowflakeImgId = function ( size )
	{
		if( self.m_sfImgDivPSArray.length <= 0 || !(self.m_sfImgDivPSArray[size.toString()] != null) )
		{
			return;
		}

		self.m_sCurII++;

		if( self.m_sCurII >= self.m_sfImgDivPSArray[size.toString()].length )
		{
			self.m_sCurII = 0;
		}

		return self.m_sCurII;
	};

	self.precalculateRandNumMoveHor = function() {
		for( var i = 0; i < self.CPRV; i++ )
		{
			var horMove = Math.floor((Math.random() * self.S_HMM));
			if( Math.random() > 0.5 ) { horMove = horMove * (-1); }
			self.m_randHNumbers.push( horMove );
		}
	};

	self.initFlashesTimer = function() {
		// init flashes start time
		if( self.F_A ) {
			setTimeout(function () {
				_adFlashes.initFlashes(self.m_snowflakeCanvas, self.m_canvasContext, self.E_UR);
				self.m_updateFlashes = true;
			}, self.F_ST * 1000);

			// set flash time end
			setTimeout( function()
			{
				self.m_updateFlashes = false;
			}, self.F_ET * 1000 );
		}
	};

	self.init = function ( snowDivId, snowCanvasZVal )
	{
		var snowDiv = null;

		// initialize calculated 'constants'
		self.updateSnowflakeSpawnThreshold();
		self.updateSnowHorMovePxPerUpd();
		self.updateSnowFallPxPerUpd();
		self.updateSnowBackgroundSpeedPxPerUpd();

		var doc = document.documentElement;
		windowOffsetTop = (window.pageYOffset || doc.scrollTop);
		windowOffsetLeft = (window.pageXOffset || doc.scrollLeft);

		var offsetTop = '';
		var offsetLeft = '';

		// if a dedicated id for a div to show the snow in is given
		if (typeof(snowDivId) !== 'undefined' && snowDivId != '' ) {
			var snowDiv = document.getElementById(snowDivId);
			self.m_windowWidth = snowDiv.scrollWidth;
			self.m_windowHeight = snowDiv.scrollHeight;

			var rect = snowDiv.getBoundingClientRect();
			offsetTop = (rect.top + windowOffsetTop) + "px";
			offsetLeft = (rect.left + windowOffsetLeft) + "px";
		}
		// if no div is given render the snow over the whole browser
		else {
			// Retrieve browser size
			// Firefox / Netscape / Opera / IE7 )
			if (typeof window.innerWidth != 'undefined') {
				self.m_windowWidth = window.innerWidth;
				self.m_windowHeight = window.innerHeight;
			}
			// IE6
			else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
				self.m_windowWidth = document.documentElement.clientWidth;
				self.m_windowHeight = document.documentElement.clientHeight;
			}
			// IE before IE6
			else {
				self.m_windowWidth = document.getElementsByTagName('body')[0].clientWidth;
				self.m_windowHeight = document.getElementsByTagName('body')[0].clientHeight;
			}

			offsetTop = (windowOffsetTop * (-1)) + "px";
			offsetLeft = (windowOffsetLeft * (-1)) + "px";
		}

		self.S_VMMPS = self.m_windowHeight;

		var winWidth = self.m_windowWidth;

		// set aspect ratio
		if( self.m_windowHeight > 0 )
		{
			self.m_wAspREffect = winWidth / self.m_windowHeight;
		}

		// set a new div for background action
		self.m_backgroundDiv = document.createElement("div");
		self.m_backgroundDiv.id = "snowBackgroundDiv";
		self.m_backgroundDiv.style.pointerEvents = "none";
		if( !self.BCK_FIA ) {
			self.setBackgroundImage(false);
		}
		self.m_backgroundDiv.style.position = "absolute";
		self.m_backgroundDiv.style.top = offsetTop;
		self.m_backgroundDiv.style.left = offsetLeft;
		self.m_backgroundDiv.style.width = winWidth.toString() + "px";
		self.m_backgroundDiv.style.height = self.m_windowHeight.toString() + "px";
		self.m_backgroundDiv.style.display = "inherit";
		document.body.appendChild(self.m_backgroundDiv);

		// set a new div for the snowflake images
		self.m_snowflakeImgDiv = document.createElement("div");
		self.m_snowflakeImgDiv.id = "snowflakeImgDiv";
		self.m_snowflakeImgDiv.style.pointerEvents = "none";
		self.m_snowflakeImgDiv.style.display = "none";
		document.body.appendChild(self.m_snowflakeImgDiv);

		// set new canvas for snowflake action
		self.m_snowflakeCanvas = document.createElement("canvas");
		self.m_snowflakeCanvas.id = "snowflakeCanvasDiv";
		self.m_snowflakeCanvas.style.pointerEvents = "none";
		self.m_snowflakeCanvas.style.position = "absolute";
		self.m_snowflakeCanvas.style.top = offsetTop;
		self.m_snowflakeCanvas.style.left = offsetLeft;
		self.m_snowflakeCanvas.width = winWidth;
		self.m_snowflakeCanvas.height = self.m_windowHeight;
		self.m_snowflakeCanvas.style.opacity = 1.0;
		self.setSnowZIndex(snowCanvasZVal);
		document.body.appendChild(self.m_snowflakeCanvas);
		self.m_canvasContext = self.m_snowflakeCanvas.getContext("2d");

		// check for scroll-state offsets
		if( snowDiv == null && window.pageXOffset > 0 )
		{
			var x = self.m_snowflakeCanvas.style.left;
			x = x.substring(0, x.indexOf("px"));
			x = parseInt(x, 10) + window.pageXOffset;
			x = String(x) + "px";
			self.m_snowflakeCanvas.style.left = x;

			x = self.m_backgroundDiv.style.left;
			x = x.substring(0, x.indexOf("px"));
			x = parseInt(x, 10) + window.pageXOffset;
			x = String(x) + "px";
			self.m_backgroundDiv.style.left = x;
		}
		if( snowDiv == null && window.pageYOffset > 0 )
		{
			var y = self.m_snowflakeCanvas.style.top;
			y = y.substring(0, y.indexOf("px"));
			y = parseInt(y, 10) + window.pageYOffset;
			y = String(y) + "px";
			self.m_snowflakeCanvas.style.top = y;

			y = self.m_backgroundDiv.style.top;
			y = y.substring(0, y.indexOf("px"));
			y = parseInt(y, 10) + window.pageYOffset;
			y = String(y) + "px";
			self.m_backgroundDiv.style.top = y;
		}

		// detect mouse clicks on canvas
		// NOTICE: to activate closing of snow on canvas click comment the next line in.
		//self.m_snowflakeCanvas.addEventListener("mousedown", onCanvasClick, false);
		function onCanvasClick(event)
		{
			//		x = event.pageXOffset;
			//		y = event.pageYOffset;
			self.clearFbAction();
		}

		// create snow background image
		self.m_fallingSnowBackgroundImg = new Image();
		self.m_fallingSnowBackgroundImg.src = self.m_imgFilePath + "snow_background.jpg";
		// set values for shifting background in a loop
		self.m_fallingSnowBackgroundImg.onload = function()
		{
			var aspectSource = self.m_fallingSnowBackgroundImg.width / self.m_fallingSnowBackgroundImg.height;
			self.m_snowBackgroundDestHeight = self.m_snowflakeCanvas.width / aspectSource;
			self.m_snowBackgroundDestY = 0;
			self.m_snowBackgroundDestYMax = 0;
			self.m_snowBackgroundLoopingY = 0;

			self.m_snowBackgrdImgClipX = self.m_fallingSnowBackgroundImg.width;
			if( self.m_wAspREffect < 1.0 )
			{
				self.m_snowBackgrdImgClipX = self.m_fallingSnowBackgroundImg.width * self.m_wAspREffect;
			}
		};

		// init flashes timer
		self.initFlashesTimer();

		// set horizontal spawning count
		self.S_HCA = self.m_windowWidth / self.S_HD;

		if (typeof(snowDivId) !== 'undefined' && snowDivId != '' ) {
			self.setSnowStylePosition('absolute');
			self.m_backgroundDiv.style.backgroundSize = 'contain';
			self.m_backgroundDiv.style.backgroundRepeat = 'no-repeat';
		}
		else {
			self.setSnowStylePosition('fixed');
			self.m_backgroundDiv.style.backgroundSize = 'contain';
			self.m_backgroundDiv.style.backgroundRepeat = 'no-repeat';
		}

		self.precalculateRandNumMoveHor();

		for( var i = 0; i < self.CPRV; i++ )
		{
			var vertMove = Math.floor((Math.random() * self.S_VMMPS)) * (-1);
			//if( Math.random() > 0.5 ) { vertMove = vertMove * (-1); }
			self.m_randVNumbers.push( vertMove );
		}

		for( var i = 0; i < self.CPRV; i++ )
		{
			var horSpawnMove = Math.floor((Math.random() * self.S_HSMM));
			if( Math.random() > 0.5 ) { horSpawnMove = horSpawnMove * (-1); }
			self.m_randHSpawnNumbers.push( horSpawnMove );
		}

		// calculate the speed scaling values for the different snowflake sizes
		var scaleArrayMaxIndex = self.SF_SMA - self.SF_SM;
		var range = self.SF_SMA - self.SF_SM;
		var rangeFinal = 1 - self.S_FMS;
		var rangeScaled = range * rangeFinal;
		var rangeOffset = range - rangeScaled;
		var offset = self.SF_SM;
		for( var i = 0; i <= scaleArrayMaxIndex; i++ )
		{
			self.m_sfSizeToSpSArray[i] = (self.SF_SM + i - offset) / range;
		}
		for( var i = 0; i <= scaleArrayMaxIndex - 1; i++ )
		{
			self.m_sfSizeToSpSArray[i] = self.m_sfSizeToSpSArray[i] + ( self.m_sfSizeToSpSArray[scaleArrayMaxIndex - i] * rangeOffset / range );
		}

		var weight = 0.25;
		for( var i = 0; i <= scaleArrayMaxIndex; i++ )
		{
			if( i == 0 )
			{
				self.m_sfRandSPTable[i] = weight;
			}
			else
			{
				self.m_sfRandSPTable[i] = self.m_sfRandSPTable[i-1] + ( (1 - self.m_sfRandSPTable[i-1]) * weight );
			}
		}

		for( var i = 0; i <= scaleArrayMaxIndex; i++ )
		{
			var size = i + self.SF_SM;
			self.m_sfImgDivPSArray[size.toString()] = [];
			for( var j = 0; j < self.m_snowImg10pxArray.length; j++ )
			{
				// make a new snowflake
				var snowflakeImg = document.createElement( "img" );
				if( size <= 10 ) {
					snowflakeImg.src = self.m_imgFilePath + self.m_snowImg10pxArray[j];
				}
				else if( size <= 20 ) {
					snowflakeImg.src = self.m_imgFilePath + self.m_snowImg20pxArray[j];
				}
				else if( size <= 30 ) {
					snowflakeImg.src = self.m_imgFilePath + self.m_snowImg30pxArray[j];
				}
				else {
					snowflakeImg.src = self.m_imgFilePath + self.m_snowImg40pxArray[j];
				}
				snowflakeImg.id = "snow_" + j + "_" + size + "x" + size;
				snowflakeImg.alt = "snow";

				self.m_snowflakeImgDiv.appendChild(snowflakeImg);

				self.m_sfImgDivPSArray[size.toString()].push(snowflakeImg);
			}
		}
	};

	self.clearFbAction = function ()
	{
		clearInterval(self.m_intervalID);

		document.body.removeChild(self.m_snowflakeImgDiv);
		document.body.removeChild(self.m_snowflakeCanvas);
		document.body.removeChild(self.m_backgroundDiv);
		var productDiv = document.getElementById("ador_plg_actionButton");
		if( productDiv != null ) {
			productDiv.parentNode.removeChild(productDiv);
		}

		location.reload();
	};

	self.stopSnow = function() {
		clearInterval(self.m_intervalID);

		var snowBackgroundImgDiv = document.getElementById('snowBackgroundDiv');
		snowBackgroundImgDiv.parentNode.removeChild(snowBackgroundImgDiv);

		var snowflakeImgDiv = document.getElementById('snowflakeImgDiv');
		snowflakeImgDiv.parentNode.removeChild(snowflakeImgDiv);

		var snowflakeCanvasDiv = document.getElementById('snowflakeCanvasDiv');
		snowflakeCanvasDiv.parentNode.removeChild(snowflakeCanvasDiv);
	};

	self.ador_fb_action = function (imgFilePath, snowDivId, productDivId, zVal)
	{
		_adFlashes = new Flashes();

		self.m_imgFilePath = imgFilePath;
		self.m_productDivId = productDivId;

		// main part starts
		self.m_snowImg10pxArray = getSnowflakes( 10 );
		self.m_snowImg20pxArray = getSnowflakes( 20 );
		self.m_snowImg30pxArray = getSnowflakes( 30 );
		self.m_snowImg40pxArray = getSnowflakes( 40 );
		self.init( snowDivId, zVal );
		self.m_intervalID = setInterval( function() { self.updateEffect(); }, self.E_UR );

		// Export function clearFbAction to make it callable from the close-button
		window['clearFbAction'] = self.clearFbAction;
	}
}

// trigger resize-end of browser window
var rtime;
var timeout = false;
var delta = 200;
var instantResizeTimeoutNeeded = true;
var instantResizeTimeout = false;
var instantResizeDelta = 250;

window.addEventListener("resize", resizeAdorSnow);

function resizeAdorSnow() {
	rtime = new Date();
	if ( timeout === false ) {
		timeout = true;
		setTimeout( snowResizeEnd, delta );
	}
	if ( instantResizeTimeoutNeeded ) {
		if ( instantResizeTimeout === false ) {
			instantResizeTimeout = true;
			setTimeout( snowResizeEndInstant, instantResizeDelta );
		}
	}
}

function snowResizeEnd() {
	if (new Date() - rtime < delta) {
		setTimeout(snowResizeEnd, delta);
		timeout = false;
		instantResizeTimeout = false;
		instantResizeTimeoutNeeded = false;
	} else {
		restartSnow();
		instantResizeTimeout = false;
		instantResizeTimeoutNeeded = true;
	}
}

function snowResizeEndInstant() {
	if( instantResizeTimeoutNeeded ) {
		if (new Date() - rtime < instantResizeDelta) {
			setTimeout(snowResizeEndInstant, instantResizeDelta);
			instantResizeTimeout = false;
		} else {
			restartSnow();
		}
	}
}

function restartSnow() {
	if (_adSnowSim != null) {
		stopSnow();
	}

	if (typeof _adSnowConfigurationFileInUse !== 'undefined') {
		restartSnowFromConfig();
	}
	else {
		goAdorSnow(	_goAdorSnowInitVals.snowDivId, _goAdorSnowInitVals.zVal, _goAdorSnowInitVals.bckImg,
					_goAdorSnowInitVals.x1, _goAdorSnowInitVals.x2, _goAdorSnowInitVals.x3,
					_goAdorSnowInitVals.a, _goAdorSnowInitVals.b, _goAdorSnowInitVals.c );
	}
}

function stopSnow() {
	_adSnowSim.stopSnow();
	_adSnowSim = null;
}

function adSetSnowAmount( snowAmount ) {
	_adSnowSim.setSnowAmount( snowAmount );
}

function adSetTurbulence( turbulence ) {
	_adSnowSim.setTurbulence( turbulence );
}

function adSetFallSpeed( fallSpeed ) {
	_adSnowSim.setFallSpeed( fallSpeed );
}

function adEnableSnowBackground( enable ) {
	_adSnowSim.enableSnowBackground( enable );
}

function adSetBackgroundImage( bckImg ) {
	_adSnowSim.setBackgroundImage( bckImg );
}

function adEnableFlashes( enable ) {
	_adSnowSim.enableFlashes( enable );
}

/**
 * @constructor
 */
function Flashes() {

	var self = this;

// Configuration Constants
	self.CFPSM = 3;
	self.CFPSMA = 6;
	self.F_TM = 0.05;
	self.F_TMA = 0.2;
	self.PTBFM = 0.1;
	self.PTBFMA = 0.35;
	self.CFS = 100;
	self.PTBFSM = 1.0;
	self.PTBFSMA = 2.5;
	self.F_AM = 0.0;
	self.F_AMA = 0.7;

// Calculated Constants
	self.F_AR = self.F_AMA - self.F_AM;

// core data member
	self.m_canvasFlashes = null;
	self.m_canvasContextFlashes = null;
	self.m_gradient = null;
	self.m_updateRate = null;
	self.m_currentFlashStack = 0;
	self.m_currentlyFlashing = false;
	self.m_flashIsBuildingUp = true;
	self.m_currentFlashAlpha = 0;
	self.m_currentFlashTime = 0;
	self.m_currentAlphaIncrease = 0;
	self.m_endTimeLastFlash = null;
	self.m_currentFlashCount = 0;
	self.m_currentFlashCounter = 0;
	self.m_currentFlashStackCounter = 0;
	self.m_flashStackActive = false;

// Refresh-controlling members
	self.m_currentAlphaIncreasePerUpdate = 0;

	self.updateFlashes = function () {
		if (self.m_currentlyFlashing) {
			self.drawFlash(self.m_currentFlashAlpha);
			if (self.m_flashIsBuildingUp) {
				self.m_currentFlashAlpha += self.m_currentAlphaIncrease;
				if (self.m_currentFlashAlpha >= self.F_AMA) {
					self.m_flashIsBuildingUp = false;
				}
			}
			else {
				self.m_currentFlashAlpha -= self.m_currentAlphaIncrease;
			}
			if (self.m_currentFlashAlpha <= self.F_AM) {
				self.m_currentlyFlashing = false;
				if (self.m_currentFlashCounter >= self.m_currentFlashCount) {
					self.m_currentFlashCounter = 0;
					self.m_currentFlashStackCounter++;
					if (self.m_currentFlashStackCounter >= self.CFS) {
						return false;
					}
					self.m_flashStackActive = false;
					var pauseTimeFlashStack = Math.random() * ( self.PTBFSMA - self.PTBFSM ) + self.PTBFSM;
					setTimeout(function () {
						self.m_flashStackActive = true;
					}, pauseTimeFlashStack * 1000);
				}
			}
		}
		else if (self.m_flashStackActive) {
			var pauseTime = Math.random() * ( self.PTBFMA - self.PTBFM ) + self.PTBFM;
			setTimeout(function () {
				self.m_currentFlashCount = Math.floor(Math.random() * ( self.CFPSMA - self.CFPSM + 1 ) + self.CFPSM);
				self.startNewFlash();
			}, pauseTime * 1000);
		}

		return true;
	};

	self.startNewFlash = function () {
//	console.log("flashStack " + self.m_currentFlashStackCounter + "   flash " + self.m_currentFlashCounter);
		self.m_flashStackActive = true;
		self.m_currentFlashCounter++;
		self.m_currentFlashTime = Math.random() * ( self.F_TMA - self.F_TM ) + self.F_TM;
		self.m_currentAlphaIncrease = ( self.F_AR / ((self.m_currentFlashTime * 1000) / self.m_updateRate) ) * 2;
		self.m_currentFlashAlpha = self.F_AM;
		self.m_currentlyFlashing = true;
		self.m_flashIsBuildingUp = true;
	};

	self.drawFlash = function (alphaValue) {
		var currentAlpha = self.m_canvasContextFlashes.globalAlpha;
		self.m_canvasContextFlashes.globalAlpha = alphaValue;

		self.m_canvasContextFlashes.rect(0, 0, self.m_canvasFlashes.width, self.m_canvasFlashes.height);
		self.m_canvasContextFlashes.fillStyle = self.m_gradient;
		self.m_canvasContextFlashes.fill();

		self.m_canvasContextFlashes.globalAlpha = currentAlpha;
	};

	self.initFlashes = function (canvas, canvasContext, updateRate) {
		self.m_canvasFlashes = canvas;
		self.m_canvasContextFlashes = canvasContext;
		self.m_updateRate = updateRate;

		var startX = self.m_canvasFlashes.width * 0.8;
		var startY = self.m_canvasFlashes.height * 0.15;
		var endX = self.m_canvasFlashes.width * 0.2 * (-1);
		var endY = self.m_canvasFlashes.height * 0.9;
		self.m_gradient = self.m_canvasContextFlashes.createLinearGradient(startX, startY, endX, endY);
		self.m_gradient.addColorStop(0, '#FFFFFF');
		self.m_gradient.addColorStop(1, '#000000');

		self.m_currentFlashCount = Math.floor(Math.random() * ( self.CFPSMA - self.CFPSM + 1 ) + self.CFPSM);
		self.startNewFlash();
	};
}
