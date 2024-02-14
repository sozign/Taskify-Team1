const popoverModal = {
	hidden: { scale: 0 },
	visible: { scale: 1 },
	visibleSmoother: {
		scale: 1,
		transition: { type: 'spring', stiffness: 260, damping: 25 },
	},
};

const hoverCard = {
	zoomedIn: { scale: 1.02 },
	controlOpacity: { opacity: 0.75 },
};

export { hoverCard, popoverModal };
