<script>
	import Decimal from 'decimal.js';

	let fields = [''];
	let sum = '0';

	/**
	 * @param {Event & { currentTarget: HTMLInputElement; }} event
	 * @param {number} index
	 */
	function handleInput(event, index) {
		fields[index] = event.currentTarget.value;
		calculateSum();
		if (fields[index] && index === fields.length - 1) {
			fields = [...fields, ''];
		}
	}

	/**
	 * @param {string} value
	 */
	function getFormattedLocaleValue(value, locale = 'en') {
		return locale === 'en' ? value.replace(',', '.') : value.replace('.', ',');
	}

	function calculateSum() {
		sum = getFormattedLocaleValue(
			fields
				.reduce((acc, val) => {
					return acc.add(new Decimal(Number(getFormattedLocaleValue(val))));
				}, new Decimal(0.0))
				.toString(),
			'de'
		);
	}
</script>

<div class="container">
	{#each fields as _, index}
		<div class="row">
			<input on:input={(event) => handleInput(event, index)} />
		</div>
	{/each}
	<div class="row result">
		SUM: <input bind:value={sum} disabled />
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
	input:disabled {
		border: 2px solid lightgray;
	}
</style>
