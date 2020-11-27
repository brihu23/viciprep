from django import template
register = template.Library()

@register.filter
def bullet(value):
	return value.split("<br>")

