<script>
	let fields = [''];

	/**
	 * @param {Event & { currentTarget: HTMLInputElement; }} event
	 * @param {number} index
	 */
	function handleInput(event, index) {
		fields[index] = event.currentTarget.value;
		if (fields[index] && index === fields.length - 1) {
			fields = [...fields, ''];
		}
	}
</script>

<div class="container">
	{#each fields as _, index}
		<div class="row">
			<input on:input={(event) => handleInput(event, index)} />
		</div>
	{/each}
	<div class="row result">
		SUM: <input disabled />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		justify-content: center;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-58%);
	}
	.row {
		border: 2px solid darkgray;
		width: 296px;
		display: flex;
		justify-content: flex-end;
		padding-left: 2rem;
	}
	.row.result {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 1.5rem;
	}
	.row:not(:first-child) {
		border-top: none;
	}
	input {
		margin: 1rem;
		text-align: right;
		padding-right: 0.5rem;
		width: 180px;
		height: 2rem;
		font-size: 1.5rem;
		font-weight: 400;
		border: 2px solid darkgray;
	}
</style>
