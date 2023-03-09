<script>
	export let message = '';
	export let visible = false;
</script>

<div class="info-message" class:hidden={!visible}>
	{@html message}
</div>

<style>
	.info-message {
		position: absolute;
		top: 1rem;
		right: 1rem;
		padding: 1rem;
		background: lightblue;
		border-radius: 0.5rem;
	}
	.info-message.hidden {
		display: none;
	}
</style>
