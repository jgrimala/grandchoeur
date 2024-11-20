.header-content {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
  
	.top-navigation {
	  display: flex;
	  
	  .nav-list {
		display: flex;
		justify-content: flex-end;
		list-style: none;
		padding: 15px 0;
		margin: 0 30px;
		color: $dark-text;
		opacity: 1; // Ensure it's fully visible by default
  
		.nav-item {
		  margin-left: $spacing-large;
  
		  .nav-link {
			text-decoration: none;
			color: var(--text-color);
			font-size: 1.5rem;
			font-weight: bold;
			transition: color 0.3s ease;
			cursor: pointer;
			display: flex;
			align-items: center;
			gap: $spacing-small;
  
			&:hover {
			  color: var(--accent);
			}
  
			&:focus,
			&:active {
			  outline: none;
			  background: transparent;
			}
		  }
		}
	  }
	}
  
	&.disable-menu {
	  opacity: 0.5;  // Reduced opacity when disabled
	  pointer-events: none; // Disable all interactions
	}
  }
  